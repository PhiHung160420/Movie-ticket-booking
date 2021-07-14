const { DataTypes } = require("sequelize");
const db = require("../config/database/db");
const Movies = require("./movie");

const Movie_images = db.define("movie_images", {
  movie_id: {
    type: DataTypes.INTEGER,
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
  }
}, {timestamps: false, createdAt: false, updatedAt: false});

Movies.hasMany(Movie_images, { foreignKey: "movie_id" });
Movie_images.belongsTo(Movies, {foreignKey: 'movie_id'});

module.exports = Movie_images;