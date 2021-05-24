const { request, response } = require("express");
const asyncHandler = require('express-async-handler');
const Movies = require('../../models/movie');
const moment = require("moment");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/movie-list", asyncHandler(async (req, res) => {
  res.locals.moment = moment;
  const data = await Movies.findAll();
  res.render("users/movie-list", {movies: data});
}));

router.get("/movie-list/:sort", asyncHandler(async (req, res) =>{
  const sort = req.params.sort;
  res.locals.moment = moment;
  if(sort === "releaseDate")
  {
    const data = await Movies.findAll({
      order: [
        ['movie_releaseDate', 'DESC']
      ]
    });
    res.render("users/movie-list", {movies: data});
  }
  if (sort==="mostViewed")
  {
    const data = await Movies.findAll({
      order: [
        ['movie_viewed', 'DESC']
      ]
    });
    res.render("users/movie-list", {movies: data});
  }
  if(sort==="mostLiked")
  {
    const data = await Movies.findAll({
      order: [
        ['movie_liked', 'DESC']
      ]
    });
    res.render("users/movie-list", {movies: data});
  }
  else {
    const data = await Movies.findAll();
    res.render("users/movie-list", {movies: data});
  }
}));

module.exports = router;
