const { request, response } = require("express");
const asyncHandler = require('express-async-handler');
const Movies = require('../../models/movie');
const moment = require("moment");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

/* router.get("/movie-detail", (req, res) => {
  res.render("users/movie-detail");
}); */

router.get("/movie-detail/:movie_id", asyncHandler(async (req, res) => {
  res.locals.moment = moment;
  const movieID = req.params.movie_id;
  const data = await Movies.findOne({
    where: {
      movie_id: movieID
    }
  });
  console.log(data);
  res.render("users/movie-detail", { movie: data });
}));

module.exports = router;
