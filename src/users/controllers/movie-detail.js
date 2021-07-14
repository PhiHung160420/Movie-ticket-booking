const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');
const Movie_images = require('../../models/movie_images');

exports.getMovieDetail = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const movie = await Movies.findOne({
      where: {
        id,
      }
    });

    if(movie)
    {
      movie.poster = Buffer.from(movie.poster, 'binary').toString('base64');
    }

    const listImages = await Movie_images.findAll({
      where: {
        movie_id: id
      }
    });

    var lstMovieImg = [];

    if(listImages.length !== 0)
    {
      listImages.forEach(e => {
        let image = Buffer.from(e.image, "binary").toString("base64");
        lstMovieImg.push(image);
      });
    }
    
    if(movie)
    {
      res.render("users/movie-detail", { movie, lstMovieImg });
    }
    else
    {
      res.render("users/404");
    }
  })