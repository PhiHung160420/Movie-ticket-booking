const moment = require("moment");
const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');

exports.getMovieDetail = asyncHandler(async (req, res) => {
    res.locals.moment = moment;
    const movieID = req.params.id;
    const data = await Movies.findOne({
      where: {
        id: movieID
      }
    });
    data.poster = Buffer.from(data.poster, 'binary').toString('base64');
    res.render("users/movie-detail", { movie: data });
  })