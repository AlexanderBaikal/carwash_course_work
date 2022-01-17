const { Token } = require("../models/models");
const jwt = require("jsonwebtoken");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_AUTH_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }

  async saveToken(userId, refreshToken) {
    // Сохраняем refresh в DB для конкретного пользователя
    const tokenData = await Token.findOne({ where: { user: userId } });

    // Нельзя зайти в аккаунт с 2 устройств одновременно !
    if (tokenData) {
      return tokenData.update({ refreshToken });
    }
    // Условие не выполнилось => пользователь логинится первый раз
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
