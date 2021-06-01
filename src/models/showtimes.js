const { DataTypes } = require("sequelize");
const db = require("../config/database/db");
const Movies = require('./movie');
const Theater_clusters = require('./theater_clusters');

const Showtimes = db.define("showtimes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  theater_cluster_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  start: {
    type: DataTypes.TIME,
  },
  end: {
    type: DataTypes.TIME,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

//foreign key between table showtimes and movies
Movies.hasMany(Showtimes, {
  foreignKey: "movie_id",
});
Showtimes.belongsTo(Movies, {foreignKey: 'movie_id'});

//foreign key between table shotimes and theater
Theater_clusters.hasMany(Showtimes, {
  foreignKey: 'theater_cluster_id',
});
Showtimes.belongsTo(Theater_clusters, {foreignKey: 'theater_cluster_id'});

module.exports = Showtimes;