const { DataTypes } = require("sequelize");
const db = require("../config/database/db");
const Movies = require("./movie");
const Theater_clusters = require("./theater_clusters");

const Theater_clusters_movies = db.define("theater_clusters_movies", {
  theater_clusters_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  theater_movies_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  theater_clusters_movies_date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Movies.belongsToMany(Theater_clusters, { through: Theater_clusters_movies, foreignKey: 'theater_movies_id', sourceKey: 'movie_id' });
Theater_clusters.belongsToMany(Movies, { through: Theater_clusters_movies, foreignKey: 'theater_clusters_id', sourceKey: 'theater_clusters_id' });

module.exports = Theater_clusters_movies;
