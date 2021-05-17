'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theater_clusters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
};