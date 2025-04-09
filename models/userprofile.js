'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {

    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'UserId' });
    }

    get age() {
      const birthDate = new Date(this.getDataValue('age'));
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();

      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
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
          args: [['Male', 'Female']],
          msg: 'Gender must be Male or Female'
        }
      }
    },
    age: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Date of birth is required' },
        notEmpty: { msg: 'Date of birth is required' },
        isOldEnough(value) {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 10) {
            throw new Error('You must be at least 10 years old to join this circus');
          }
        }
      },
      get() {
        const birthDate = new Date(this.getDataValue('age'));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Location is required' },
        notEmpty: { msg: 'Location is required' }
      }
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};