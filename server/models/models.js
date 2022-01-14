const { Sequelize } = require("../db");
const Car = require("./car");
const OrgAddress = require("./org-address");
const OrgPhone = require("./org-phone");
const Organization = require("./organization");
const Reservation = require("./reservation");
const Service = require("./service");
const ServicePrice = require("./service-price");
const ServiceReservation = require("./service-reservation");
const Token = require("./token");
const TransportType = require("./transport-type");
const User = require("./user");

User.hasMany(Car);
Car.belongsTo(User);

Reservation.belongsTo(User); // reserv.getUser()
User.hasMany(Reservation); // user.getAllReservs()

Reservation.belongsTo(Car);
Car.hasMany(Reservation);

Reservation.belongsTo(Organization);
Organization.hasMany(Reservation);

Organization.hasMany(OrgPhone); // getallphones
OrgPhone.belongsTo(Organization);

Organization.hasMany(OrgAddress);
OrgAddress.belongsTo(Organization);

Service.belongsToMany(Reservation, { through: ServiceReservation });
Reservation.belongsToMany(Service, { through: ServiceReservation });

ServicePrice.belongsTo(Service); // service.getprice

ServicePrice.belongsTo(TransportType);

ServicePrice.belongsTo(Organization);

Car.belongsTo(TransportType);

module.exports = {
  Car,
  OrgPhone,
  Organization,
  Reservation,
  Service,
  ServicePrice,
  ServiceReservation,
  Token,
  User,
  TransportType,
  OrgAddress,
};
