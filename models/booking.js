'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking.init({
    Booking_id: {type:DataTypes.INTEGER,allowNull,primaryKey},
    user_id: DataTypes.INTEGER,
    Movie_id: DataTypes.INTEGER,
    Theater_id: DataTypes.INTEGER,
    Booking_time: DataTypes.TIME,
    Total_money: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};