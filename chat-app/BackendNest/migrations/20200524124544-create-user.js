'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nickNameColor: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      onlineStatus: {
        type: Sequelize.BOOLEAN
      },
      isMuted: {
        type: Sequelize.BOOLEAN
      },
      isBaned: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        defaultValue: new Date(),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};