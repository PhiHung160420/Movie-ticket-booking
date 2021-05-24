const { DataTypes } = require("sequelize");
const db = require("../config/database/db");

const Theater_clusters = db.define("theater_clusters", {
  theater_clusters_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  theater_clusters_name: {
    type: DataTypes.STRING,
  },
  theater_clusters_address: {
    type: DataTypes.STRING,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

module.exports = Theater_clusters;
