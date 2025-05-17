const indexRouter = require('express').Router();
const {
  registration,
  login,
  logout,
  refresh,
} = require('../controllers/userController');
const basketRouter = require('./api/basketRouter');
const colorRouter = require('./api/colorRouter');
const favoriteRouter = require('./api/favoriteRoute');
const patternRouter = require('./api/patternRouter');
const pictureRouter = require('./api/pictureRouter');
const socksRouter = require('./api/socksRouter');

indexRouter.post('/registration', registration);
indexRouter.post('/login', login);
indexRouter.post('/logout', logout);
indexRouter.get('/refresh', refresh);
indexRouter.use('/pictures', pictureRouter);
indexRouter.use('/colors', colorRouter);
indexRouter.use('/patterns', patternRouter);
indexRouter.use('/socks', socksRouter);
indexRouter.use('/baskets', basketRouter);
indexRouter.use('/favorites', favoriteRouter);

module.exports = indexRouter;
