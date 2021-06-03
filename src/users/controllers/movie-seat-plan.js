const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Theater_clusters_movie = require("../../models/theater_clusters_movies");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');

const { Op } = require("sequelize");

exports.getSeat = async (req, res, next) => {
    const { showtimeId } = req.params;

    const showtime = await Showtimes.findOne({
        attributes: ['theater_id'],
        where: {
            showtimes_id: showtimeId
        }
    }); 

    const theater = await Theater.findOne({
        attributes: ['theater_horizontial_size', 'theater_vertical_size'],
        where: {
            theater_id: showtime.theater_id
        }
    });

    const booking = await Booking.findAll({
        attributes: ['booking_id'],
        where: {
            showtimes_id: showtimeId
        }
    });

    var bookingList = [];

    booking.forEach(e => {
        bookingList.push(e.booking_id)
    });

    const seatBookedList = await Ticket.findAll({
        attributes: ['horizontal_address', 'vertical_address'],
        where: {
            ticket_booking_id: {
                [Op.in]: bookingList,
            }        
        }
    });

    res.locals.horizontalSize = theater.theater_horizontial_size;
    res.locals.verticalSize = theater.theater_vertical_size;
    res.locals.seatBookedList = seatBookedList;
    res.render("users/movie-seat-plan");
};