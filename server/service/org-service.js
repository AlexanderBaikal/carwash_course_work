const { QueryTypes } = require("sequelize/dist");
const sequelize = require("../db");
const ApiError = require("../exceptions/api-error");
const OrgAddress = require("../models/org-address");
const OrgPhone = require("../models/org-phone");
const Organization = require("../models/organization");
const { OrgInfoDto, OrgInfoDtoLite } = require("../dtos/orgInfo-dto");
const TransportType = require("../models/transport-type");
const ServicePrice = require("../models/service-price");
const Service = require("../models/service");

class OrgService {
  async getOrgInfo(orgId) {
    const info = await Organization.findOne({
      include: [{ model: OrgPhone }, { model: OrgAddress }],
      where: { id: orgId },
    });
    const infoDto = new OrgInfoDto(info);
    return infoDto;
  }

  //todo date
  async getPriceList(orgId, transportTypeName) {
    const priceList = await sequelize.query(
      'SELECT services.id, services.name, services.description, service_prices.price\
      FROM services JOIN service_prices ON service_prices."serviceId" = services.id\
              WHERE service_prices."organizationId" = ? \
              AND service_prices."transportTypeId" IN (SELECT id FROM transport_types WHERE name = ?)',
      {
        replacements: [orgId, transportTypeName],
        type: QueryTypes.SELECT,
      }
    );
    return priceList;
  }
  async getCompanyOrgs() {
    const orgs = await Organization.findAll();
    const orgDtos = orgs.map((org) => new OrgInfoDtoLite(org));
    return orgDtos;
  }

  async updateOrgInfo(orgId, name, description, phones, addresses) {
    await Organization.update(
      {
        name,
        description,
      },
      {
        where: { id: orgId },
      }
    );

    let promises = [];
    let ph;
    let ad;
    for (let phone of phones) {
      if (phone.id === -1) {
        ph = OrgPhone.create({
          phone: phone.phone,
          organizationId: orgId,
        });
      } else if (phone.deleted) {
        ad = OrgPhone.destroy({
          where: { id: phone.id },
        });
      } else {
        ph = OrgPhone.update(
          {
            phone: phone.phone,
          },
          {
            where: { organizationId: orgId, id: phone.id },
          }
        );
      }
      promises.push(ph);
    }
    for (let address of addresses) {
      if (address.id === -1) {
        console.log("ADDRESSCREATED");
        ad = OrgAddress.create({
          address: address.address,
          organizationId: orgId,
        });
      } else if (address.deleted) {
        console.log("ADDRESSDELETED");
        ad = OrgAddress.destroy({
          where: { id: address.id },
        });
      } else {
        console.log("ADDRESSUPDATED");
        ad = OrgAddress.update(
          {
            address: address.address,
          },
          {
            where: { organizationId: orgId, id: address.id },
          }
        );
      }

      promises.push(ad);
    }
    const result = await Promise.all(promises);

    return result;
  }
}

module.exports = new OrgService();
