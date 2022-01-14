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
    this.phones = model.org_phones.map((object) => object.phone);
    this.addresses = model.org_addresses.map((object) => object.address);
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
