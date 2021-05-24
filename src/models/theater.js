const { DataTypes } = require("sequelize");
const db = require("../config/database/db");
const Theater_clusters = require("./theater_clusters");

const Theater = db.define("theater", {
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  theater_cluster_id: {
    type: DataTypes.INTEGER,
  },
  theater_name: {
    type: DataTypes.STRING,
  },
  theater_kind: {
    type: DataTypes.STRING,
  },
  horizontial_size: {
    type: DataTypes.FLOAT,
  },
  theater_vertical_size: {
    type: DataTypes.FLOAT,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Theater_clusters.hasMany(Theater, { foreignKey: "theater_cluster_id" });
Theater.belongsTo(Theater_clusters, {foreignKey: 'theater_cluster_id'});

module.exports = Theater;
