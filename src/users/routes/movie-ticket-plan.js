const { request, response } = require("express");
var router = require("express").Router();
const movieTicketPlanController = require('../controllers/movie-ticket-plan');

router.get("/movie-ticket-plan", movieTicketPlanController.getShowTimes);
router.post("/movie-ticket-plan", movieTicketPlanController.postShowTimes);

module.exports = router;
