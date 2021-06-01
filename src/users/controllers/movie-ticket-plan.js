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

    //lấy danh sách các suất chiếu
    const {getListShowtimes} = req;

    //lấy danh sách các phim
    res.locals.listMovies = await Movies.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('name')), 'name']
        ]
    });

    //lấy danh sách các cụm rạp chiếu
    res.locals.listTheaterClusters = await Theater_clusters.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('name')), 'name']
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
    }
    else {
        res.locals.listShowTimes = null;
    }

    res.render("users/movie-ticket-plan");
});

exports.postShowTimes = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    const { select_movie_name, select_theater_cluster, select_date } = req.body;

    //kiểm tra nếu không tồn tại dữ liệu
    if(!select_movie_name || !select_theater_cluster || !select_date){
        req.flash('info', '')
        res.redirect('/user/movie-ticket-plan');
    }

    const getMovieByName = await Movies.findOne({
        where: {
            name: select_movie_name
        },  
        attributes: ["id", "name"]
    });

    const getTheaterByName = await Theater_clusters.findOne({
        where: {
            name: select_theater_cluster
        },
        attributes: ["id", "name"]
    });

    const showtimesList = await Showtimes.findAll({
        attributes: [
            'date',
            'start', 
            'end',
        ],
        include: [
            {
                model: Movies,
                attributes: ['name']
            },
            {
                model: Theater_clusters,
                attributes: ['name']
            }
        ],
        where: {
            movie_id: getMovieByName.id,
            theater_cluster_id: getTheaterByName.id,
            date: select_date
        },
    });

    if(showtimesList.length !==0)
    {
        req.session.listShowtimes = showtimesList;
        res.redirect('/user/movie-ticket-plan');
    }
    else {
        res.locals.listShowTimes = null;
        req.flash('info', 'Phim bạn chọn tạm thời không còn suất chiếu. Xin vui lòng chọn phim khác')
        res.redirect('/user/movie-ticket-plan');
    }
});