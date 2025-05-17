'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Socks',
      [
        {
          user_id: 1,
          color_id: 1,
          picture_id: 1,
          pattern_id: 1,
        },
        {
          user_id: 1,
          color_id: 2,
          picture_id: 1,
          pattern_id: 1,
        },
        {
          user_id: 1,
          color_id: 3,
          picture_id: 1,
          pattern_id: 1,
        },
        {
          user_id: 2,
          color_id: 2,
          picture_id: 2,
          pattern_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Socks', null, {});
  },
};
