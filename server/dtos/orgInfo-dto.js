class OrgInfoDto {
  name;
  description;
  imageUrl;
  phones;
  addresses;
  id;
  constructor(model) {
    this.name = model.name;
    this.id = model.id;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.phones = model.org_phones.map((object) => ({
      phone: object.phone,
      id: object.id,
    }));
    this.addresses = model.org_addresses.map((object) => ({
      address: object.address,
      id: object.id,
    }));
  }
}

class OrgInfoDtoLite {
  name;
  description;
  imageUrl;
  id;
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.id = model.id;
  }
}

module.exports = {
  OrgInfoDto,
  OrgInfoDtoLite,
};
