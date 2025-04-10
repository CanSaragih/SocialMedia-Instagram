'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {

    static associate(models) {
      PostTag.belongsTo(models.Post, { foreignKey: 'PostId' });
      PostTag.belongsTo(models.Tag, { foreignKey: 'TagId' });
    }
  }
  PostTag.init({
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};