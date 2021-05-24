const { request, response } = require("express");
var router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Movies = require("../../models/movie");

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const justRelease = await Movies.findAll({
      order: [["movie_releaseDate", "DESC"]],
      limit: 6,
    });
    const mostViewed = await Movies.findAll({
      order: [["movie_viewed", "DESC"]],
      limit: 6,
    });
    const mostLiked = await Movies.findAll({
      order: [["movie_liked", "DESC"]],
      limit: 6,
    });
    res.render("users/home", {
      justRelease: justRelease,
      mostViewed: mostViewed,
      mostLiked: mostLiked,
    });
  })
);

module.exports = router;
