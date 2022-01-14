const { QueryTypes } = require("sequelize/dist");
const sequelize = require("../db");
const { UserDto, UserLiteDto } = require("../dtos/user-dto");
const { User } = require("../models/models");
const tokenService = require("./token-service");
const mailService = require("./mail-service");
const ApiError = require("../exceptions/api-error");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });
    console.log(candidate);
    if (candidate) {
      throw Error(`Пользователь с почитовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = `${process.env.API_URL}/api/activate/${uuid.v4()}`;
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async verifyOtp(phone, hash, otp) {}

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    // ищем пользователя в БД
    let user = await User.findOne({ where: { id: userData.id } });
    return this.getUserDataWithToken(user, userData.phone);
  }

  async getUserDataWithToken(user, phone) {
    let cars;
    // Если не нашли пользователя в БД
    if (!user) {
      user = await User.create({ phone });
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
    const userLiteDto = new UserLiteDto(user); // id, phone
    const tokens = tokenService.generateTokens({ ...userLiteDto });
    await tokenService.saveToken(userLiteDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }

  async updateUserInfo(id, { firstName, lastName, middleName, gender }) {
    await User.update(
      { firstName, lastName, middleName, gender },
      { where: { id } }
    );

    return await User.findOne({ where: { id } });
  }

  async getNotifications(userId) {
    const result = await Notification.findAll({
      where: { userId },
      include: [{ model: NotificationType, attributes: ["name"] }],
    });
    return result;
  }
}

module.exports = new UserService();
