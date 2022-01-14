const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Organization = sequelize.define("organization", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
});

module.exports = Organization;
