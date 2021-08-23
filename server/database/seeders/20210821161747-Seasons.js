'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Seasons', [{
        SeasonID: 2011,
        SeasonName: "2011, Short Rain",
        StartDate: "1/4/2011",
        EndDate: "8/1/2022",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        SeasonID: 2012,
        SeasonName: "2012, Short Rain",
        StartDate: "8/1/2012",
        EndDate: "8/1/2022",
        createdAt: new Date(),
        updatedAt: new Date()
    },
  ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Seasons', null, {});
  }
};
