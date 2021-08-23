'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerSummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CustomerID: {
        type: Sequelize.INTEGER
      },
      SeasonID: {
        type: Sequelize.INTEGER
      },
      TotalRepaid: {
        type: Sequelize.DECIMAL
      },
      TotalCredit: {
        type: Sequelize.DECIMAL
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CustomerSummaries');
  }
};