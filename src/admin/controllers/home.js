const asyncHandler = require("express-async-handler");
const db = require('../../config/database/db');
const Theater_clusters = require('../../models/theater_clusters');
const Movies = require('../../models/movie');

exports.getLayout = asyncHandler(async (req, res) => {
    //get list theater_clusters
    res.locals.lstTheaterCluster = await Theater_clusters.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('name')), 'name']
        ]
    });

    //get list movies
    res.locals.lstMovies = await Movies.findAll({
        attributes: [
            [db.fn('DISTINCT', db.col('name')), 'name']
        ]
    });
    res.render("admin/index");
});