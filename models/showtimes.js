'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtimes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Showtimes.init({
    Movie_id: DataTypes.INTEGER,
    Theater_id: DataTypes.INTEGER,
    Showtimes_start: DataTypes.TIME,
    Showtimnes_end: DataTypes.TIME,
    Showtime_money: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Showtimes',
  });
  return Showtimes;
};