import { AxiosResponse } from "axios";
import $api from "../http";

export default class OrgService {
  static async getDiscounts(orgId) {
    return $api.get(`/organization/${orgId}/discounts`);
  }
  static async getOrgInfo(orgId) {
    return $api.get(`/organization/${orgId}/info`);
  }
  static async getPriceList(orgId, transportTypeName) {
    return $api.get(`/organization/${orgId}/priceList/${transportTypeName}`);
  }

  static async getCompanyOrgs(companyId) {
    return $api.get(`/company/${companyId}/organizations`);
  }
}
