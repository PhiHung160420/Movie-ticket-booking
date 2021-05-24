/* "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {}
  }
  Movie.init(
    {
      Movie_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      Movie_name: DataTypes.STRING,
      Movie_releasedate: DataTypes.DATE,
      Movie_poster: DataTypes.BLOB,
      movie_duration: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
}; */

const { DataTypes } = require("sequelize");
const db = require("../config/database/db");

const Movies = db.define("movies", {
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_name: {
    type: DataTypes.STRING,
  },
  movie_releaseDate: {
    type: DataTypes.DATE,
  },
  movie_poster: {
    type: DataTypes.BLOB,
  },
  movie_duration: {
    type: DataTypes.TIME,
  },
  movie_viewed: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  movie_liked: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

module.exports = Movies;
