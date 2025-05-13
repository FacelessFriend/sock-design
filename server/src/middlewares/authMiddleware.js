const HttpError = require("../utils/httpError");
const { validateAccessToken } = require('../services/tokenService');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new HttpError(401, "Пользователь не авторизован");
      return next(error);
    }

    const authToken = authHeader.split(" ")[1];

    const userData = validateAccessToken(authToken);

    if (!userData) {
      const error = new HttpError(401, "Пользователь не авторизован");
      return next(error);
    }

    res.locals.user = userData;
    return next();
  } catch (e) {
    return next(e);
  }
};
