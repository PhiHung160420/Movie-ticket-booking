const { Sequelize } = require("sequelize");

module.exports = new Sequelize( process.env.DATABASE_URL ||  "postgres://postgres:0373829264@localhost:5432/Movie-ticket-booking");
