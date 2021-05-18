const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/movie-list", (req, res) => {
  res.render("users/movie-list");
});

module.exports = router;
