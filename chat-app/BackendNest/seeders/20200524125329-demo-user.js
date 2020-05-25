'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      nickName: 'Admin',
      password:  '$2y$10$mPfXKl31b2P2wcaeRQWf4Owg6L22cPV4jzEPy67SqMq5nbgY.gnOa',
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
