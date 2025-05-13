'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pictures',
      [
        {
          picture_url: 'testPic1',
          picture: 'testUrlPic1',
        },
        {
          picture_url: 'testPic2',
          picture: 'testUrlPic2',
        },
        {
          picture_url: 'testPic3',
          picture: 'testUrlPic3',
        },
        {
          picture_url: 'testPic4',
          picture: 'testUrlPic4',
        },
        {
          picture_url: 'testPic5',
          picture: 'testUrlPic5',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pictures', null, {});
  },
};
