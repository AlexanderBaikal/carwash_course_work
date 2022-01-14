const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Car = sequelize.define("car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  model: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  regNumber: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Car;
