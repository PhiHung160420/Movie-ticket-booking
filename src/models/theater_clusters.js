const { DataTypes } = require("sequelize");
const db = require("../config/database/db");

const TheaterClusters = db.define(
  'theater_clusters', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    timestamps: false
  }
);

module.exports = TheaterClusters;