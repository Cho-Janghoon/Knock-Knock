module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [{
      user_id: 1,
      comment: "깨끗하고 좋아요",
      toilet_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 1,
      comment: "더러워 뒤지는줄",
      toilet_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
  }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};