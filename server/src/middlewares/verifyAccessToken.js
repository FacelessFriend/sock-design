require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.autorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    console.error('Verify access token error', message);
    res.status(403).json({
      message: 'Invalid access token',
    });
  }
}

module.exports = verifyAccessToken;
