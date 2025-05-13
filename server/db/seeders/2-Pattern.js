'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Patterns',
      [
        {
          pattern: 'testPattern1',
          pattern_url: 'urlTestPattern1',
        },
        {
          pattern: 'testPattern2',
          pattern_url: 'urlTestPattern2',
        },
        {
          pattern: 'testPattern3',
          pattern_url: 'urlTestPattern3',
        },
        {
          pattern: 'testPattern4',
          pattern_url: 'urlTestPattern4',
        },
        {
          pattern: 'testPattern5',
          pattern_url: 'urlTestPattern5',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patterns', null, {});
  },
};
