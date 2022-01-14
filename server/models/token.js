const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user: { type: DataTypes.INTEGER, unique: true },
  refreshToken: { type: DataTypes.STRING },
});

module.exports = Token;
