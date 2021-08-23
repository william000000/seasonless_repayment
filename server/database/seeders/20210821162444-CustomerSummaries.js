'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('CustomerSummaries', [
        {
          CustomerID: 1,
          SeasonID: 2011,
          TotalCredit: 100,
          TotalRepaid: 80,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          CustomerID: 1,
          SeasonID: 2012,
          TotalCredit: 120,
          TotalRepaid: 30,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          CustomerID: 2,
          SeasonID: 2011,
          TotalCredit: 100,
          TotalRepaid: 80,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          CustomerID: 2,
          SeasonID: 2012,
          TotalCredit: 120,
          TotalRepaid: 30,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          CustomerID: 3,
          SeasonID: 2011,
          TotalCredit: 100,
          TotalRepaid: 100,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        CustomerID: 3,
        SeasonID: 2012,
        TotalCredit: 120,
        TotalRepaid: 120,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});
 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CustomerSummaries', null, {});
  }
};
