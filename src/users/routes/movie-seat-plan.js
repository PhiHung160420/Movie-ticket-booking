const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/movie-seat-plan", (req, res) => {
  res.render("users/movie-seat-plan");
});

module.exports = router;
