const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Theater_clusters_movie = require("../../models/theater_clusters_movies");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');
const db = require('../../config/database/db');

const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

let showtime = null;
let currentSeatList = null;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL || 'ltw2nnd@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'erzfrkcjmupomcnt'
    }
});

async function getInfoShowtime(showtimeId) {
    const showtime = await Showtimes.findOne({        
        where: {
            showtimes_id: showtimeId
        }
    });

    const movie = await Movies.findOne({
        attributes: ['movie_name'],
        where: {
            movie_id: showtime.movie_id
        }
    });

    const theater = await Theater.findOne({
        attributes: [
            'theater_name', 
            'theater_kind'
        ],
        include: [{
            model: Theater_clusters,
            attributes: ['theater_clusters_name']
        }],
        where: {
            theater_id: showtime.theater_id,
        }
    });

    const totalPrice = showtime.price * currentSeatList.length;

    const result = {
        showtime: showtime,
        theater: theater,
        movieName: movie.movie_name,
        totalPrice: totalPrice
    }

    return result;
}

let currentShowtime = null;

exports.getCheckout = async (req, res, next) => {
    const showtimeId = req.session.showtimeId;
    currentSeatList = req.session.currentSeatList;

    if(!showtimeId || !currentSeatList) {
        res.redirect("/user")
    }

    // showtime = await Showtimes.findOne({        
    //     where: {
    //         showtimes_id: showtimeId
    //     }
    // });
    
    // const movie = await Movies.findOne({
    //     attributes: ['movie_name'],
    //     where: {
    //         movie_id: showtime.movie_id
    //     }
    // });

    // const theater = await Theater.findOne({
    //     attributes: [
    //         'theater_name', 
    //         'theater_kind'
    //     ],
    //     include: [{
    //         model: Theater_clusters,
    //         attributes: ['theater_clusters_name']
    //     }],
    //     where: {
    //         theater_id: showtime.theater_id,
    //     }
    // });

    // const totalPrice = showtime.price * currentSeatList.length;

    // res.locals.showtime = showtime;
    // res.locals.theater = theater;
    // res.locals.movieName = movie.movie_name;

    currentShowtime = await getInfoShowtime(showtimeId);
    res.locals.showtime = currentShowtime.showtime;
    res.locals.theater = currentShowtime.theater;
    res.locals.movieName = currentShowtime.movieName;
    res.locals.totalPrice = currentShowtime.totalPrice;
    res.locals.currentSeatList = currentSeatList;
    res.render("users/movie-checkout");
};

exports.postCheckout = async (req, res, next) => {
    const userId = 1;

    try {
        const result = await db.transaction(async (t) => {
            const booking = await Booking.create({
                user_id: userId,
                showtimes_id: currentShowtime.showtime.showtimes_id,
                booking_time: new Date(),
                booking_price: currentShowtime.totalPrice
            }, { transaction: t });

            const ticketList = [];

            currentSeatList.forEach(e => {
                const ticket = {
                    ticket_booking_id: booking.booking_id,
                    ticket_seat_code: e,
                    horizontal_address: e.slice(1),
                    vertical_address: e[0],
                    ticket_price: currentShowtime.showtime.price
                };

                ticketList.push(ticket);
            });

            Ticket.bulkCreate(ticketList, {
                returning: true
            }, { transaction: t });

            delete req.session.showtimeId;
            delete req.session.currentSeatList;

            const dataQRCode = {
                userId: "1",
                bookingId: booking.booking_id,
                showtimeId: currentShowtime.showtime.showtimes_id,
            }
            let stringDataQRCode = JSON.stringify(dataQRCode);
            let qrCode = await QRCode.toDataURL(stringDataQRCode);

            transporter.sendMail({
                from: process.env.EMAIL || 'ltw2nnd@gmail.com',
                to: 'minhhuy243@gmail.com',
                subject: "Đặt vé thành công",
                textEncoding:"base64",
                html: `<h1> Xin chào DisplayName </h1>
                    <table align="left">
                        <tbody>
                            <tr>
                                <td>Mã vé:</td>
                                <th align="left">${booking.booking_id}</th>
                            </tr>
                            <tr>
                                <td>Phim:</td>
                                <th align="left">${currentShowtime.movieName}</th>
                            </tr>
                            <tr>
                                <td>Cụm rạp:</td>
                                <th align="left">${currentShowtime.theater.theater_cluster.theater_clusters_name}</th>
                            </tr>
                            <tr>
                                <td>Phòng chiếu:</td>
                                <th align="left">${currentShowtime.theater.theater_name}</th>
                            </tr>
                            <tr>
                                <td>Thời gian:</td>
                                <th align="left">None ${currentShowtime.showtime.start_time.substr(0, 5)} ~ ${currentShowtime.showtime.end_time.substr(0, 5)}</th>
                            </tr>
                            <tr>
                                <td>Ghế:</td>
                                <th align="left"><p>${currentSeatList.join(', ')}</p></th>
                            </tr>
                            <tr>
                                <td>Phương thức thanh toán (Payment method):</td>
                                <th align="left">Thẻ nội địa (Domestic Card)</th>
                            </tr>
                            <tr>
                                <td>Thời gian thanh toán (Payment Time):</td>
                                <th align="left">27/03/2021 21:31:20</th>
                            </tr>
                            <tr>
                                <td>Tổng tiền (Total):</td>
                                <th align="left"><u></u>${currentShowtime.totalPrice}<u></u> VND</th>
                            </tr>
                            <tr>
                                <td>Mã QR:</td>
                                <td><img src="cid:qrCode" atl="img"></td>
                            </tr>
                        </tbody>
        
                    </table>
                `,
                attachments: [{
                    path: qrCode,
                    cid: 'qrCode' //same cid value as in the html img src
                }]
            }).then(console.log).catch(console.error);

            res.redirect(`/user/booking/success/${booking.booking_id}`);
        });
    } catch(e) {
        console.log(e);
    }
};