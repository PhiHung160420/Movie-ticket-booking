const db = require('../../config/database/db');
const moment = require("moment");
const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Theater_clusters_movie = require("../../models/theater_clusters_movies");
const Booking = require('../../models/booking');
const Ticket = require('../../models/ticket');
const User = require('../../models/user');

exports.getShowTimes = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    res.locals.listMovies = await Movies.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('movie_name')), 'movie_name']
        ]
    });
    res.locals.listTheaterClusters = await Theater_clusters.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('theater_clusters_name')), 'theater_clusters_name']
        ]
    });
    res.locals.listDate = await Theater_clusters_movie.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('theater_clusters_movies_date')), 'theater_clusters_movies_date']
        ],
        order: [["theater_clusters_movies_date", "ASC"]],
    }); 
    if(res.locals.getListShowtimes)
    {
        res.locals.listShowTimes = res.locals.getListShowtimes;
        res.locals.listMovies = null;
        res.locals.listTheaterClusters = null;
        res.locals.listDate = null;
    }
    else
    {
        res.locals.listShowTimes = await Showtimes.findAll({
            attributes: [
                'movie_id', 'showtimes_start', 'showtimes_end'
            ],
            include: [
            {
                model: Movies,
                attributes: ['movie_name']
            }
            ]
        });
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
            'movie_id',
            'theater_cluster_id',
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
        const msg = "Phim bạn chọn đã hết suất chiếu. Vui lòng chọn phim khác";
        res.redirect('/user/?message=' + msg);
    }
});