const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "users/layouts/layout";
  next();
});

router.get("/sign-up", (req, res) => {
  res.render("users/sign-up");
});

module.exports = router;
