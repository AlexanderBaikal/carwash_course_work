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
}

module.exports = new OrgService();
