const db = require('../../config/database/db');
const moment = require("moment");
const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Movies_schedule = require("../../models/movies_schedule");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');

//lấy các suất chiếu
exports.getShowTimes = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    const {getListShowtimes} = req;

    //lấy danh sách các phim
    res.locals.listMovies = await Movies.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('movie_name')), 'movie_name']
        ]
    });

    //lấy danh sách các cụm rạp chiếu
    res.locals.listTheaterClusters = await Theater_clusters.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('theater_clusters_name')), 'theater_clusters_name']
        ]
    });

    //lấy danh sách các ngày chiếu phim
    res.locals.listDate = await Movies_schedule.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('schedule_date')), 'schedule_date']
        ],
        order: [["schedule_date", "ASC"]],
    }); 
    
    if(getListShowtimes)
    {
        res.locals.listShowTimes = getListShowtimes;
        res.locals.listMovies = null;
        res.locals.listTheaterClusters = null;
        res.locals.listDate = null;
    }
    else {
        res.locals.listShowTimes = null;
    }
    res.render("users/movie-ticket-plan");
});

exports.postShowTimes = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    const { select_movie_name, select_theater_cluster, select_date } = req.body;
    const getMovieByName = await Movies.findOne({
        where: {
            movie_name: select_movie_name
        },
        attributes: ["movie_id", "movie_name"]
    });
    const getTheaterByName = await Theater_clusters.findOne({
        where: {
            theater_clusters_name: select_theater_cluster
        },
        attributes: ["theater_clusters_id", "theater_clusters_name"]
    });
    const showtimesList = await Showtimes.findAll({
        attributes: [
            'showtimes_date',
            'showtimes_start', 
            'showtimes_end',
        ],
        include: [
            {
                model: Movies,
                attributes: ['movie_name']
            },
            {
                model: Theater_clusters,
                attributes: ['theater_clusters_name']
            }
        ],
        where: {
            movie_id: getMovieByName.movie_id,
            theater_cluster_id: getTheaterByName.theater_clusters_id,
            showtimes_date: select_date
        },
    });
    if(showtimesList.length !==0)
    {
        req.session.listShowtimes = showtimesList;
        res.redirect('/user/movie-ticket-plan');
    }
    else {
        res.locals.listMovies = null;
        res.locals.listTheaterClusters = null;
        res.locals.listDate = null;
        res.locals.listShowTimes = null;
        res.render('users/movie-ticket-plan', {movie_name: select_movie_name, theater_cluster_name: select_theater_cluster, showtime_date: select_date});
    }
});