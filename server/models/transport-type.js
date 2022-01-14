const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const TransportType = sequelize.define("transport_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = TransportType;
