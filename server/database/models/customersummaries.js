'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerSummaries = sequelize.define('CustomerSummaries', {
    CustomerID: DataTypes.INTEGER,
    SeasonID: DataTypes.INTEGER,
    TotalRepaid: DataTypes.DECIMAL,
    TotalCredit: DataTypes.DECIMAL
  }, {});
  CustomerSummaries.associate = function(models) {
    CustomerSummaries.belongsTo(
      models.Customers,
      { foreignKey: 'CustomerID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    CustomerSummaries.belongsTo(
      models.Seasons,
      { foreignKey: 'SeasonID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    CustomerSummaries.hasMany(
      models.Repayments,
      { targetKey: 'ParentID' },
      { sourceKey: 'id' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return CustomerSummaries;
};