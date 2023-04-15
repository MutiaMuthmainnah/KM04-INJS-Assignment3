'use strict';

const data = [
  {
    tittle: "Photo 1",
    caption: "Caption Photo 1",
    image_url: "https://picsum.photos/id/1/200/300",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tittle: "Photo 1",
    caption: "Caption Photo 2",
    image_url: "https://picsum.photos/id/2/200/300",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Photos", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photos", null, {})
  }
};
