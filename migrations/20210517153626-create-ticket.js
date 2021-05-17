'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      Ticket_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Booking_id: {
        type: Sequelize.INTEGER
      },
      Seatcode: {
        type: Sequelize.STRING
      },
      HorizontalAddress: {
        type: Sequelize.STRING
      },
      VerticalAddress: {
        type: Sequelize.STRING
      },
      Price: {
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
    await queryInterface.dropTable('Tickets');
  }
};