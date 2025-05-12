'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    static associate(models) {
      this.hasMany(models.Sock, {
        foreignKey: 'picture_id',
      });
    }
  }
  Picture.init(
    {
      picture_url: DataTypes.TEXT,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Picture',
    }
  );
  return Picture;
};
