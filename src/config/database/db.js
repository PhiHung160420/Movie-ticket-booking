const { Sequelize } = require("sequelize");

module.exports = new Sequelize( process.env.DATABASE_URL ||  "postgres://postgres:0373829264@localhost:5432/movie-ticket-booking"
  // process.env.DATABASE_URL ||  "postgres://postgres:0373829264@localhost:5432/todo", {
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false
  //     }
  //   }
  // }
);


