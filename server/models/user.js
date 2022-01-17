const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, unique: true, allowNull: false },
  activationLink: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  middleName: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

module.exports = User;
