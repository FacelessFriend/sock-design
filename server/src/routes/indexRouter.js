const basketRouter = require('./api/basketRouter');
const colorRouter = require('./api/colorRouter');
const patternRouter = require('./api/patternRouter');
const pictureRouter = require('./api/pictureRouter');
const socksRouter = require('./api/socksRouter');

const indexRouter = require('express').Router();

indexRouter.use('/pictures', pictureRouter);
indexRouter.use('/colors', colorRouter);
indexRouter.use('/patterns', patternRouter);
indexRouter.use('/socks', socksRouter);
indexRouter.use('/baskets', basketRouter);

module.exports = indexRouter;
