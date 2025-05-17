'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern extends Model {
    static associate(models) {
      this.hasMany(models.Sock, {
        foreignKey: 'pattern_id',
      });
    }
  }
  Pattern.init(
    {
      pattern: DataTypes.STRING,
      pattern_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Pattern',
    }
  );
  return Pattern;
};
