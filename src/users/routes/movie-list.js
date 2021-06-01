const movieListController = require('../controllers/movie-list');
var router = require("express").Router();

router.get("/movie-list", movieListController.listMovies);

router.get("/movie-list/:sort", movieListController.ListMoviesSort);

module.exports = router;
