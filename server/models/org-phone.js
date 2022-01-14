const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const OrgPhone = sequelize.define("org_phone", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.STRING(17), allowNull: false }, // todo size 17 or 11?
});

module.exports = OrgPhone;
