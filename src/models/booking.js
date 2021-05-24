const { DataTypes} = require("sequelize");
const db =require("../config/database/db");
const User=require("./user");
const Showtimes=require("./showtimes");
const Booking=db.define("booking",{
  booking_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV1,
    primaryKey: true,
    allowNull:false,
  },
  booking_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  booking_showtime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  booking_time: {
    type: DataTypes.DATE,
    allowNull:false,
  },
  bookin_price: {
    type: DataTypes.FLOAT,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

User.hasMany(Booking, {foreignKey: "booking_user"});
Booking.belongsTo(User, {foreignKey: "booking_user"});

Showtimes.hasMany(Booking, {foreignKey: "booking_showtime"});
Booking.belongsTo(Showtimes, {foreignKey: "booking_showtime"});

module.exports = Booking;