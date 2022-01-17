class UserDto {
  id;
  email;
  isActivated;

  constructor(model, cars) {
    cars = cars || [];
    this.email = model.getDataValue("email");
    this.id = model.getDataValue("id");
    this.isActivated = model.getDataValue("isActivated");
    this.info = {
      firstName: model.firstName,
      lastName: model.lastName,
      middleName: model.middleName,
      gender: model.gender,
    };
    this.cars = cars;
  }
}

class UserLiteDto {
  phone;
  id;
  constructor(model) {
    this.email = model.getDataValue("email");
    this.id = model.getDataValue("id");
  }
}

module.exports = {
  UserDto,
  UserLiteDto,
};
