/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater_clusters extends Model {
    static associate(models) {
    }
  };
  Theater_clusters.init({
    Theater_clusters_id: {type:DataTypes.INTEGER,primaryKey:true,allowNull:false},
    Theater_clusters_name: DataTypes.STRING,
    Theater_clusters_Adddresss: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theater_clusters',
  });
  return Theater_clusters;
}; */

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
