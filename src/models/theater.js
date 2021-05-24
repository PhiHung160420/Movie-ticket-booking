'use strict';
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
    /*Theater_clusters: DataTypes.INTEGER,*/
    Theater_kind: DataTypes.INTEGER,
    Theater_horizontal_size: DataTypes.FLOAT,
    Theater_Vertical_size: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Theater',
  });
  return Theater;
};