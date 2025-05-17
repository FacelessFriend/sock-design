require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    console.error('Verify refresh token error', message);
    res.status(401).clearCookie('refreshToken').json({
      message: 'Invalid refresh token',
    });
  }
}

module.exports = verifyRefreshToken;

//не используем
