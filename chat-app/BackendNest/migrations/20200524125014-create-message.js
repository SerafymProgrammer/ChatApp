'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      messageid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      textMessage: {
        type: Sequelize.STRING
      },
      authorMessage: {
        type: Sequelize.STRING
      },
      colorAuthorName: {
        type: Sequelize.STRING
      },
      timeMessage: {
        type: Sequelize.STRING
      },
      roomId: {
        foreignKey: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};