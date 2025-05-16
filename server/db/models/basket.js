'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Sock, {
        foreignKey: 'socks_id',
      });
    }
  }
  Basket.init(
    {
      user_id: DataTypes.INTEGER,
      socks_id: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Basket',
    }
  );
  return Basket;
};
