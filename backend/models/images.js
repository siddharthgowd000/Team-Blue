const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/dbconfig');

const images = sequelize.define('images', {
  id: { type: DataTypes.INTEGER, primaryKey: true ,autoIncrement:true},
  userid: { type: DataTypes.INTEGER},
  media:{type:DataTypes.ARRAY(DataTypes.TEXT),allowNull:true},
  disease:DataTypes.STRING,
  prediction:DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = images;