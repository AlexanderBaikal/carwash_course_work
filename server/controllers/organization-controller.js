const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const orgService = require("../service/org-service");
const reservService = require("../service/reserv-service");
const userService = require("../service/user-service");

class OrgController {
  async getOrgInfo(req, res, next) {
    try {
      const orgId = req.params.orgId;
      const info = await orgService.getOrgInfo(orgId);
      return res.json(info);
    } catch (e) {
      next(e);
    }
  }

  async getPriceList(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const orgId = req.params.orgId;
      const transportTypeName = req.params.transportTypeName;
      const pricelist = await orgService.getPriceList(orgId, transportTypeName);
      return res.json(pricelist);
    } catch (e) {
      next(e);
    }
  }

  async getDayReservations(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const orgId = parseInt(req.params.orgId);
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month);
      const day = parseInt(req.params.day);
      const reservations = await reservService.getDayReservations(
        orgId,
        year,
        month,
        day
      );
      return res.json(reservations);
    } catch (e) {
      next(e);
    }
  }
  async getCompanyOrgs(req, res, next) {
    try {
      const orgs = await orgService.getCompanyOrgs();
      return res.json(orgs);
    } catch (e) {
      next(e);
    }
  }
  async updateOrgInfo(req, res, next) {
    try {
      const { name, description, phones, addresses } = req.body;
      const { orgId } = req.params;
      const info = await orgService.updateOrgInfo(
        orgId,
        name,
        description,
        phones,
        addresses
      );
      return res.json(info);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrgController();
