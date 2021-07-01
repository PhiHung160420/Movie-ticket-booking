const asyncHandler = require("express-async-handler");
const Movies = require('../../models/movie');

exports.listMovies = asyncHandler(async (req, res) => {
    const data = await Movies.findAll();
    data.forEach( movie => {
      if(movie.poster)
      {
        movie.poster = Buffer.from(movie.poster, 'binary').toString('base64');
      }
    });
    res.render("users/movie-list", { movies: data });
})

exports.ListMoviesSort = asyncHandler(async (req, res) => {
    const sort = req.params.sort;
    console.log(sort);
    if (sort === "releaseDate") 
    {
      console.log('into releaseDate');
      const data = await Movies.findAll({
        order: [["releaseDate", "DESC"]],
      });

      data.forEach( movie => {
        if(movie.poster)
        {
          movie.poster = Buffer.from(movie.poster, 'binary').toString('base64');
        }
      });
      
      console.log(data);
      res.render("users/movie-list", { movies: data });
    }
    if (sort === "mostViewed") 
    {
      const data = await Movies.findAll({
        order: [["viewed", "DESC"]],
      });

      data.forEach( movie => {
        if(movie.poster)
        {
          movie.poster = Buffer.from(movie.poster, 'binary').toString('base64');
        }
      });

      res.render("users/movie-list", { movies: data });
    }
    if (sort === "mostLiked") {
      const data = await Movies.findAll({
        order: [["liked", "DESC"]],
      });

      data.forEach( movie => {
        if(movie.poster)
        {
          movie.poster = Buffer.from(movie.poster, 'binary').toString('base64');
        }
      });

      res.render("users/movie-list", { movies: data });
    } 
});

