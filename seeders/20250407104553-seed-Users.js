'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin1',
        email: 'admin1@gmail.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'admin2',
        email: 'admin2@gmail.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: ['admin1', 'admin2']
    }, {})
  }
};
