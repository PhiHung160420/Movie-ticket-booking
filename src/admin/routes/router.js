const { request, response } = require("express");
var router = require("express").Router();

router.use((request, response, next) => {
  response.locals.layout = "admin/layouts/layout";
  next();
});

router.get("/home", (req, res) => {
  res.render("admin/index");
});

router.get("/home/detail", (req, res) => {
  res.render("admin/detail");
});

module.exports = router;
