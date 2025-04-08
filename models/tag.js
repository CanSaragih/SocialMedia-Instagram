'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Post, { through: models.PostTag })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Tag name is required' },
        notEmpty: { msg: 'Tag name is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};
