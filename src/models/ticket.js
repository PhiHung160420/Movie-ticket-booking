const { DataTypes} = require("sequelize");
const db = require("../config/database/db");
const Booking = require("./booking");

const Ticket = db.define("ticket",{
  id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV1,
    allowNull:false,
    primaryKey:true,
  },
  booking_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  seat_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horizontal_address : {
    type: DataTypes.STRING,
    allowNull:false,
  },
  vertical_address: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull:false,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Booking.hasOne(Ticket, {foreignKey: "booking_id"}); 
Ticket.belongsTo(Booking, {foreignKey: "booking_id"});

module.exports = Ticket;