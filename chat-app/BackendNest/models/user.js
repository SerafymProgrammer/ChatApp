'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickName: DataTypes.STRING,
    password: DataTypes.STRING,
    nickNameColor: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    onlineStatus: DataTypes.BOOLEAN,
    isMuted: DataTypes.BOOLEAN,
    isBaned: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};