'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    textMessage: DataTypes.STRING,
    authorMessage: DataTypes.STRING,
    colorAuthorName: DataTypes.STRING,
    timeMessage: DataTypes.STRING, 
    roomId: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};