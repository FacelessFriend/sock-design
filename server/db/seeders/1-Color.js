'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Colors',
      [
        {
          code: '#00FFFF',
          color: 'Aqua',
        },
        {
          code: '#FFFFFF',
          color: 'White',
        },
        {
          code: '#000000',
          color: 'Black',
        },
        {
          code: '#FFFF00',
          color: 'Yellow',
        },
        {
          code: '#FF0000',
          color: 'Red',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
