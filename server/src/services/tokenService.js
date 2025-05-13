require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Token } = require("../../db/models");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refresh = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refresh,
  };
};

const saveToken = async (user_id, refresh) => {
  const tokenData = await Token.findOne({ where: { user_id } });

  if (tokenData) {
    tokenData.refresh = refresh;
    await tokenData.save();
    return tokenData;
  }

  const token = await Token.create({ user_id, refresh });
  return token;
};

const removeToken = async (refresh) => {
  const countToken = await Token.destroy({ where: { refresh } });
  return countToken;
};

const findToken = async (refresh) => {
  const token = await Token.findOne({ where: { refresh } });
  return token;
};

const validateAccessToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return isValid;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return isValid;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
};
