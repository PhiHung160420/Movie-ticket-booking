const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/home", (req, res) => {
  res.render("users/home");
});

module.exports = router;
