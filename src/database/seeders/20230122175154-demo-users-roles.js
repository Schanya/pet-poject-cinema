'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users_roles', [
      {
        userId: 1,
        roleId: 1
      },
      {
        userId: 2,
        roleId: 2
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users_roles', null, {});
  }
};
