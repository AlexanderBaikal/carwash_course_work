const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Service = sequelize.define("service", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
});

module.exports = Service;
