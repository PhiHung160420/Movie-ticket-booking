const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/sign-in", (req, res) => {
  res.render("users/sign-in");
});

module.exports = router;
