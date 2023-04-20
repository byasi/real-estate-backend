'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer);
      Transaction.belongsTo(models.Property);
    }
  }
  Transaction.init({
    date: {type: DataTypes.STRING,
    allowNull: false},
    mode: {type: DataTypes.STRING,
    allowNull: false},
    bankname:DataTypes.STRING,
    status: {type: DataTypes.STRING,
    allowNull: false},
    amountpaid: {type: DataTypes.INTEGER,
    allowNull: false},
    CustomerId: {type: DataTypes.INTEGER,
    allowNull: false},
    PropertyId: {type: DataTypes.INTEGER,
    allowNull: false}
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};