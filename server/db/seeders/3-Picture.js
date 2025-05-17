'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pictures',
      [
        {
          picture_url: 'pic_winter_blue.svg',
          picture: 'winter',
        },
        {
          picture_url: 'pic_paw.svg',
          picture: 'paw',
        },
        {
          picture_url: 'pic_heart_orange.svg',
          picture: 'hearts',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pictures', null, {});
  },
};
