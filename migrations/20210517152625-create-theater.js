'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Theaters', {
      Theater_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Theater_name: {
        type: Sequelize.STRING
      },
      /*Theater_clusters: {
        type: Sequelize.INTEGER
      },*/
      Theater_kind: {
        type: Sequelize.INTEGER
      },
      Theater_horizontal_size: {
        type: Sequelize.FLOAT
      },
      Theater_Vertical_size: {
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
    await queryInterface.dropTable('Theaters');
  }
};