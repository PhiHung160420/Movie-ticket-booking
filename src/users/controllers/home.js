const db = require('../../config/database/db');
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Movies = require('../../models/movie');
const Showtimes = require("../../models/showtimes");
const Theater = require("../../models/theater");
const Theater_clusters = require("../../models/theater_clusters");
const Theater_clusters_movie = require("../../models/theater_clusters_movies");

exports.getMovies = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    //get message from query
    const message = req.query.message;
    console.log("message: " + message);
    //set value for select option 
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

    //top movie just release
    const justRelease = await Movies.findAll({
      order: [["movie_releaseDate", "DESC"]],
      limit: 6,
    });
    //top most watched movie
    const mostViewed = await Movies.findAll({
      order: [["movie_viewed", "DESC"]],
      limit: 6,
    });
    //top favoried movie
    const mostLiked = await Movies.findAll({
      order: [["movie_liked", "DESC"]],
      limit: 6,
    });

    res.render("users/home", {
      justRelease: justRelease,
      mostViewed: mostViewed,
      mostLiked: mostLiked,
      message: message
    });
});