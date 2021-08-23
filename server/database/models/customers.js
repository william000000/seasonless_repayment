'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    CustomerID: DataTypes.INTEGER,
    CustomerName: DataTypes.STRING
  }, {});
  Customers.associate = function(models) {
    Customers.hasMany(
      models.CustomerSummaries,
      { sourceKey: 'id' },
      { targetKey: 'CustomerID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );

    Customers.hasMany(
      models.Repayments,
      { sourceKey: 'CustomerID' },
      { targetKey: 'CustomerID' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return Customers;
};