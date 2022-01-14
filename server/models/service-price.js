const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const ServicePrice = sequelize.define("service_price", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = ServicePrice;
