'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Baskets',
      [
        {
          user_id: 1,
          socks_id: 1,
        },
        {
          user_id: 1,
          socks_id: 2,
        },
        {
          user_id: 1,
          socks_id: 3,
        },
        {
          user_id: 2,
          socks_id: 1,
        },
        {
          user_id: 2,
          socks_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Baskets', null, {});
  },
};
