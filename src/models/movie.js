'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Movie.init({
    Movie_id: {type:DataTypes.INTEGER,primaryKey:true,allowNull:false},
    Movie_name: DataTypes.STRING,
    Movie_releasedate: DataTypes.DATE,
    Movie_poster: DataTypes.BLOB,
    movie_duration: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};