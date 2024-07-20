const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/dbconfig');

const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true },
  username: { type: DataTypes.STRING},
  email: DataTypes.STRING,
  fullname: DataTypes.STRING,
  avatar: {type:DataTypes.TEXT,allowNull:true},
  password: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = Users;