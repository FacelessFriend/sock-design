'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sock extends Model {
    static associate(models) {
      this.belongsTo(models.Color, {
        foreignKey: 'color_id',
      });
      this.belongsTo(models.Picture, {
        foreignKey: 'picture_id',
      });
      this.belongsTo(models.Pattern, {
        foreignKey: 'pattern_id',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Sock.init(
    {
      user_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      picture_id: DataTypes.INTEGER,
      pattern_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Sock',
    }
  );
  return Sock;
};
