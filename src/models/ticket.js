const { DataTypes} = require("sequelize");
const db = require("../config/database/db");
const Booking = require("./booking");

const Ticket = db.define("ticket",{
  ticket_id: {
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull:false,
    primaryKey:true,
  },
  ticket_booking_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ticket_seat_code: {
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
  ticket_price: {
    type: DataTypes.FLOAT,
    allowNull:false,
  },
}, {timestamps: false, createdAt: false, updatedAt: false});

Booking.hasMany(Ticket, {foreignKey: "ticket_booking_id"}); 
Ticket.belongsTo(Booking, {foreignKey: "ticket_booking_id"});

module.exports = Ticket;