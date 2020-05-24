'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      nickName: 'John',
      password: 'Doe',
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
