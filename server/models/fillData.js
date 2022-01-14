const { Sequelize } = require("../db");
const OrgAddress = require("./org-address");
const OrgPhone = require("./org-phone");
const Organization = require("./organization");
const Service = require("./service");
const ServicePrice = require("./service-price");
const TransportType = require("./transport-type");

module.exports = async function fillData() {
  await TransportType.findOrCreate({
    where: {
      name: "MOTO",
    },
  });

  await TransportType.findOrCreate({
    where: {
      name: "TRUCK",
    },
  });

  const carType = await TransportType.findOrCreate({
    where: {
      name: "CAR",
    },
  });

  await TransportType.findOrCreate({
    where: {
      name: "BUS",
    },
  });

  let orgAcadem = await Organization.findOrCreate({
    where: {
      name: "Мойка на Академической",
      imageUrl: `https://i.ibb.co/br419r4/image.png`,
      description:
        "Автомоечный комлекс может одновременно принимать до 4 транспортных средств. На территории имеется кафе, удобная парковка",
    },
  });

  let orgMU = await Organization.findOrCreate({
    where: {
      name: "Мойка на Марии Ульяновой",
      imageUrl: `https://i.ibb.co/br419r4/image.png`,
      description:
        "Автомоечный комлекс может одновременно принимать до 4 транспортных средств. На территории имеется кафе, удобная парковка",
    },
  });

  orgAcadem = orgAcadem[0];

  const kuzov = await Service.findOrCreate({
    where: {
      name: "Мойка кузова",
      description: "20-30 минут",
    },
  });

  const salon = await Service.findOrCreate({
    where: {
      name: "Мойка салона",
      description: "20-30 минут",
    },
  });

  const complex = await Service.findOrCreate({
    where: {
      name: "Комплексная мойка",
      description: "20-30 минут",
    },
  });

  await ServicePrice.findOrCreate({
    where: {
      serviceId: kuzov[0].getDataValue("id"),
      transportTypeId: carType[0].getDataValue("id"),
      organizationId: orgAcadem.getDataValue("id"),
      date: new Date("01.01.2022 22:00:00"),
      price: 600,
    },
  });

  await ServicePrice.findOrCreate({
    where: {
      serviceId: kuzov[0].getDataValue("id"),
      transportTypeId: carType[0].getDataValue("id"),
      organizationId: orgMU[0].getDataValue("id"),
      date: new Date("01.01.2022 22:00:00"),
      price: 750,
    },
  });

  await ServicePrice.findOrCreate({
    where: {
      serviceId: salon[0].getDataValue("id"),
      transportTypeId: carType[0].getDataValue("id"),
      organizationId: orgAcadem.getDataValue("id"),
      date: new Date("01.01.2022 22:00:00"),
      price: 500,
    },
  });

  await ServicePrice.findOrCreate({
    where: {
      serviceId: complex[0].getDataValue("id"),
      transportTypeId: carType[0].getDataValue("id"),
      organizationId: orgAcadem.getDataValue("id"),
      date: new Date("01.01.2022 22:00:00"),
      price: 1200,
    },
  });

  await OrgPhone.findOrCreate({
    where: {
      organizationId: orgAcadem.getDataValue("id"),
      phone: "+7 (3952)-123-456",
    },
  });

  await OrgPhone.findOrCreate({
    where: {
      organizationId: orgAcadem.getDataValue("id"),
      phone: "+7 (950)-978-654",
    },
  });

  await OrgAddress.findOrCreate({
    where: {
      organizationId: orgAcadem.getDataValue("id"),
      address: "Академическая 5а/1, Иркутск",
    },
  });
};
