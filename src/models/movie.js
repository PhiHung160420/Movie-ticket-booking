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
  movie_trailer: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {timestamps: false, createdAt: false, updatedAt: false});

module.exports = Movies;