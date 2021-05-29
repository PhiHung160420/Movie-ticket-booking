const { DataTypes } = require("sequelize");
const db = require("../config/database/db");
const Movies = require("./movie");
const Theater_clusters = require("./theater_clusters");

const Movies_schedule = db.define("movies_schedule", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  theater_cluster_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  schedule_date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Movies.belongsToMany(Theater_clusters, { through: Movies_schedule, foreignKey: 'movie_id', sourceKey: 'movie_id' });
Theater_clusters.belongsToMany(Movies, { through: Movies_schedule, foreignKey: 'theater_cluster_id', sourceKey: 'theater_clusters_id' });

module.exports = Movies_schedule;
