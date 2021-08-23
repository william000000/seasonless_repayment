'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repayments = sequelize.define('Repayments', {
    RepaymentID: DataTypes.INTEGER,
    CustomerID: DataTypes.INTEGER,
    SeasonID: DataTypes.INTEGER,
    Date: DataTypes.DATE,
    Amount: DataTypes.DECIMAL,
    ParentID: DataTypes.INTEGER
  }, {});
  Repayments.associate = function(models) {
    Repayments.belongsTo(
      models.Customers,
      { foreignKey: 'CustomerID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    Repayments.belongsTo(
      models.Seasons,
      { foreignKey: 'SeasonID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    Repayments.belongsTo(
      models.CustomerSummaries,
      { foreignKey: 'ParentID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return Repayments;
};