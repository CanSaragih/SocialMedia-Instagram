'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProfile.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Userid is required' },
        notEmpty: { msg: 'UserId is required' }
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Bio is required' },
        notEmpty: { msg: 'Bio is required' },
        len: {
          args: [0, 300],
          msg: 'Bio must be under 300 characters'
        }
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Gender is required' },
        notEmpty: { msg: 'Gender is required' },
        isIn: {
          args: [['Male', 'Famale']],
          msg: 'Gender must be Male or Female'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Age is required' },
        notEmpty: { msg: 'Age is required' },
        min: {
          args: [10],
          msg: 'You must be at least 10 years old to join this circus'
        }
      }
    },
    location: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Location is required' },
      notEmpty: { msg: 'Location is required' }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};