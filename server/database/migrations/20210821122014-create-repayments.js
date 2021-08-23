'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Repayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'RepaymentID'
      },
      CustomerID: {
        type: Sequelize.INTEGER
      },
      SeasonID: {
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATE
      },
      Amount: {
        type: Sequelize.DECIMAL
      },
      ParentID: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Repayments');
  }
};