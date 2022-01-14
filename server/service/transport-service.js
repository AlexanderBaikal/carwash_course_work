const { QueryTypes } = require("sequelize/dist");
const sequelize = require("../db");
const { UserDto } = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { Car, TransportType, User } = require("../models/models");
const userService = require("./user-service");

class TransportService {
  async addTransport(userId, brand, model, regNumber, transportType) {
    const transport = await TransportType.findOne({
      where: { name: transportType },
    });
    const car = await Car.create({
      brand,
      model,
      regNumber,
      transportTypeId: transport.getDataValue("id"),
      userId,
    });
    return this.getUserDataWithTransport(userId);
  }

  async updateTransport(userId, brand, model, regNumber, transportType, carId) {
    const transport = await TransportType.findOne({
      where: { name: transportType },
    });
    const car = await Car.update(
      {
        brand,
        model,
        regNumber,
        transportTypeId: transport.getDataValue("id"),
      },
      {
        where: {
          userId,
          id: carId,
        },
      }
    );

    return this.getUserDataWithTransport(userId);
  }

  async deleteTransport(userId, carId) {
    const car = await Car.destroy({
      where: {
        userId,
        id: carId,
      },
    });

    return this.getUserDataWithTransport(userId);
  }

  async getUserDataWithTransport(userId) {
    const user = await User.findOne({ where: { id: userId } });
    let cars;
    // Если не нашли пользователя в БД
    if (!user) {
      throw Error("Пользователь не найден");
    } else {
      cars = await sequelize.query(
        'SELECT cars.id, cars.brand, cars.model, cars."regNumber", transport_types.name as "transportType"\
        FROM cars JOIN transport_types ON cars."transportTypeId" = transport_types.id\
                WHERE cars."userId" = ?',
        {
          replacements: [user.id],
          type: QueryTypes.SELECT,
        }
      );
    }

    const userDto = new UserDto(user, cars); // id, phone, info, cars
    return { user: userDto };
  }
}

module.exports = new TransportService();