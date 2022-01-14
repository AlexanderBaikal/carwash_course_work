const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const UserCar = sequelize.define("user_car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = UserCar;
