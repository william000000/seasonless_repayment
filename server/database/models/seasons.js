'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seasons = sequelize.define('Seasons', {
    SeasonID: DataTypes.INTEGER,
    SeasonName: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE
  }, {});
  Seasons.associate = function(models) {
    Seasons.hasMany(
      models.Repayments,
      { sourceKey: 'SeasonID' },
      { targetKey: 'SeasonID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    Seasons.hasMany(
      models.CustomerSummaries,
      { sourceKey: 'SeasonID' },
      { targetKey: 'SeasonID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return Seasons;
};