const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
  validateAccessToken,
  validateRefreshToken,
} = require("./tokenService");
const HttpError = require("../exceptions/HttpError");
const { validateEmail, validatePassword } = require("../utils/validators");

const registrationService = async (name, email, password) => {
  try {
    validateEmail(email);
    validatePassword(password);
  } catch (error) {
    throw new HttpError(error.status || 400, error.message);
  }

  const candidateByEmail = await User.findOne({ where: { email } });

  if (candidateByEmail) {
    throw new HttpError(400, "Пользователь с такой почтой уже существует");
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const user = await User.create({ name, email, password: hashPassword });
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refresh);

  return {
    ...tokens,
    user: payload,
  };
};

const loginService = async (email, password) => {
  try {
    validateEmail(email);
  } catch (error) {
    throw new HttpError(error.status || 400, error.message);
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new HttpError(404, "Пользователя не существует");
  }

  const isPassEqual = await bcrypt.compare(password, user.password);

  if (!isPassEqual) {
    throw new HttpError(400, "Неверный пароль");
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refresh);

  return {
    ...tokens,
    user: payload,
  };
};

const logoutService = async (refresh) => {
  const countToken = await removeToken(refresh);
  return countToken;
};

const refreshService = async (refresh) => {
  if (!refresh) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const isValid = validateRefreshToken(refresh);

  const tokenFromDB = await findToken(refresh);

  if (!isValid || !tokenFromDB) {
    throw new HttpError(403, "Пользователь не авторизован");
  }

  const user = await User.findByPk(tokenFromDB.user_id);

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const tokens = generateTokens(payload);
  await saveToken(payload.id, tokens.refresh);

  return {
    ...tokens,
    user: payload,
  };
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
  refreshService,
};
