const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');

const { Op } = require("sequelize");

let showtime = null
let bookedSeatList = null;

exports.getSeat = async (req, res, next) => {
    const { showtimeId }= req.params;

    showtime = await Showtimes.findOne({
        attributes: ['theater_id', 'price'],
        where: {
            showtimes_id: showtimeId
        }
    }); 

    const movie = await Movies.findOne({
        attributes: ['movie_name'],
        where: {
            movie_id: showtimeId
        }
    });

    const theater = await Theater.findOne({
        attributes: [
            'theater_name', 
            'theater_kind',
            'theater_horizontial_size', 
            'theater_vertical_size',
        ],
        include: [{
            model: Theater_clusters,
            attributes: ['theater_clusters_name']
        }],
        where: {
            theater_id: showtime.theater_id,
        }
    });

    const booking = await Booking.findAll({
        attributes: ['booking_id'],
        where: {
            showtimes_id: showtimeId
        }
    });

    const bookingList = [];

    booking.forEach(e => {
        bookingList.push(e.booking_id)
    });

    bookedSeatList = await Ticket.findAll({
        attributes: ['ticket_seat_code', 'horizontal_address', 'vertical_address'],
        where: {
            ticket_booking_id: {
                [Op.in]: bookingList,
            }        
        }
    });

    res.locals.horizontalSize = theater.theater_horizontial_size;
    res.locals.verticalSize = theater.theater_vertical_size;
    res.locals.price = showtime.price;
    res.locals.bookedSeatList = bookedSeatList;
    res.render("users/movie-seat-plan");
};

exports.postSeat = async (req, res, next) => {
    const { showtimeId } = req.params;

    let currentSeatList = JSON.parse(req.body.currentSeatList);

    bookedSeatList.forEach(e => {
        const index = currentSeatList.indexOf(e.ticket_seat_code);
        if (index > -1) {
            currentSeatList.splice(index, 1);
        }
    });

    req.session.showtimeId = showtimeId;  
    req.session.currentSeatList = currentSeatList;  
    res.redirect('/user/movie-checkout');
};