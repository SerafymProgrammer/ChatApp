'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      nickName: 'Admin',
      password:  '$2b$10$JNMrrXw5gFA/Gaur1ZO6/uHkFShKnwYJ4SigQwISNwLYvCHhc1ukO',
      nickNameColor: '#000',
      isAdmin: true,
      onlineStatus: false,
      isMuted: false,
      isBaned: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
