'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      Tag.belongsToMany(models.Post, { through: models.PostTag })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      unique: { msg: 'tag name already in use' }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
