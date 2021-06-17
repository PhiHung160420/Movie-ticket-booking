const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');
const db = require('../../config/database/db');

const QRCode = require('qrcode');

exports.getBookingSuccess = async (req, res, next) => {
   const { booking_id } = req.params;

    const booking = await Booking.findOne({   
        attributes: ['showtimes_id'],     
        where: {
            booking_id: booking_id
        }
    });
    
    const showtime = await Showtimes.findOne({
        where: {
            showtimes_id: booking.showtimes_id
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

    const seatList = await Ticket.findAll({
        attributes: ['ticket_seat_code'],
        where: {
            ticket_booking_id: booking_id
        }
    });

    const dataQRCode = {
        userId: "1",
        bookingId: booking_id,
        showtimeId: showtime.showtimes_id,
    }

    const momoQRCode = "https://test-payment.momo.vn/pay/store/MOMOKFA420210617-2106171443298352528f?a=10000&b=B001221&s=683aeb44452a938eb8e8550ebf888da90972c6d08097517956bfff7159d8358f";
     
    let stringDataQRCode = JSON.stringify(dataQRCode);

    let qrCode = await QRCode.toDataURL(stringDataQRCode);

    res.locals.qrCode = qrCode;
    res.locals.showtime = showtime;
    res.locals.theater = theater;
    res.locals.movieName = movie.movie_name;
    res.locals.seatList = seatList;
    res.render("users/movie-booking-success");
};