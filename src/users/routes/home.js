const { request, response } = require("express");
var router = require("express").Router();
const asyncHandler = require("express-async-handler");
const homeController = require('../controllers/home');

router.get("/", homeController.getMovies);

module.exports = router;
