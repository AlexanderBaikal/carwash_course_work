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
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почитовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    return await this.getUserDataWithToken(user);
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    await user.update({ isActivated: true });
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не найден`
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    return await this.getUserDataWithToken(user);
  }

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
    let user = await User.findOne({ where: { email: userData.email } });
    return await this.getUserDataWithToken(user);
  }

  async getUserDataWithToken(user) {
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
    return await this.getUserDataWithToken(user);
  }
}

module.exports = new UserService();
