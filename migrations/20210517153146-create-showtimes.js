'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Showtimes', {
      Movie_id: {
        type: Sequelize.INTEGER
      },
      Theater_id: {
        type: Sequelize.INTEGER
      },
      Showtimes_start: {
        type: Sequelize.TIME
      },
      Showtimnes_end: {
        type: Sequelize.TIME
      },
      Showtime_money: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Showtimes');
  }
};