'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Patterns',
      [
        {
          pattern: 'winter',
          pattern_url: 'pat_winter_blue.svg',
        },
        {
          pattern: 'pink',
          pattern_url: 'pat_pink.svg',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patterns', null, {});
  },
};
