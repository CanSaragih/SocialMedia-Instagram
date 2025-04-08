'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: 'UserId' });
      User.hasMany(models.Post, { foreignKey: 'UserId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Username is required' },
        notEmpty: { msg: 'Username is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email is required' },
        isEmail: {
          msg: 'Email must be a valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required' },
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [8, 100],
          msg: 'Password must be at least 8 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Username is required' },
        notEmpty: { msg: 'Username is required' },
        isIn: {
          args: [['admin', 'user']],
          msg: 'Role must be Admin or Users'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)
  })

  return User;
};