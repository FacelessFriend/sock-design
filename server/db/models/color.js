'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      this.hasMany(models.Sock, {
        foreignKey: 'color_id',
      });
    }
  }
  Color.init(
    {
      code: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Color',
    }
  );
  return Color;
};
