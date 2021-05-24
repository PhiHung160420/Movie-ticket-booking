/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater extends Model {
    static associate(models) {
      Theater.belongsTo(models.Theater_clusters,{
        foreignKey:"Theater_clusters",
        as:'Theater_clusters_id'
      });
    }
  };
  Theater.init({
    Theater_id: {type:DataTypes.INTEGER,primaryKey:true,allowNull:false},
    Theater_name: DataTypes.STRING,
    Theater_kind: DataTypes.INTEGER,
    Theater_horizontal_size: DataTypes.FLOAT,
    Theater_Vertical_size: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
}; */

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
  theater_horizontial_size: {
    type: DataTypes.FLOAT,
  },
  theater_vertical_size: {
    type: DataTypes.FLOAT,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Theater_clusters.hasMany(Theater, { foreignKey: "theater_cluster_id" });
Theater.belongsTo(Theater_clusters, {foreignKey: 'theater_cluster_id'});

module.exports = Theater;
