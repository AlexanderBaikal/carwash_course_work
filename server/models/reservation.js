const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Reservation = sequelize.define("reservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Reservation;
