'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        password: '$2b$10$Mqo4AUGYlW9TAcpCiF./Pu3tXpTRalzicmVmsmzXPVchUJz/9iQYe',//admin
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@gmail.com',
        password: '$2b$10$lE1R/Fpx60VIXTDoHRIm0O.zjhrMpoIGqTAM69.UfEwFsU2DEH8eW',//user
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
