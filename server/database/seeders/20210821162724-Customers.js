'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Customers', [
      {
        CustomerID: 1,
        CustomerName: "Hibo Jane",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        CustomerID: 2,
        CustomerName: "Joe Doe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CustomerID: 3,
        CustomerName: "Sagaton Vik",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
