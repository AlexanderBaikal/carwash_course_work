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
    this.role = model.getDataValue("role");
  }
}

class UserLiteDto {
  email;
  id;
  role;
  constructor(model) {
    this.email = model.getDataValue("email");
    this.id = model.getDataValue("id");
    this.role = model.getDataValue("role");
  }
}

module.exports = {
  UserDto,
  UserLiteDto,
};
