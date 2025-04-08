'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'UserId' });
      Post.belongsToMany(models.Tag, { through: models.PostTag });
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required' },
        notEmpty: { msg: 'Title is required' }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Content is required' },
        notEmpty: { msg: 'Content is required' }
      }
    },

    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'ImgUrl is required' },
        notEmpty: { msg: 'ImgUrl is required' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'UserId is required' },
        notEmpty: { msg: 'UserId is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};