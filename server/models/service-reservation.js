const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const ServiceReservation = sequelize.define("service_reservation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = ServiceReservation;
