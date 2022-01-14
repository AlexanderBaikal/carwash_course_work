const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const OrgAddress = sequelize.define("org_address", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.STRING, allowNull: false },
});

module.exports = OrgAddress;
