const moment = require("moment");
const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');

exports.listMovies = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    const data = await Movies.findAll();
    res.render("users/movie-list", { movies: data });
})

exports.ListMoviesSort = asyncHandler(async (req, res) => {
    const sort = req.params.sort;
    res.locals.moment = moment;
    if (sort === "releaseDate") {
      const data = await Movies.findAll({
        order: [["releaseDate", "DESC"]],
      });
      res.render("users/movie-list", { movies: data });
    }
    if (sort === "mostViewed") {
      const data = await Movies.findAll({
        order: [["viewed", "DESC"]],
      });
      res.render("users/movie-list", { movies: data });
    }
    if (sort === "mostLiked") {
      const data = await Movies.findAll({
        order: [["liked", "DESC"]],
      });
      res.render("users/movie-list", { movies: data });
    } else {
      const data = await Movies.findAll();
      res.render("users/movie-list", { movies: data });
    }
});

