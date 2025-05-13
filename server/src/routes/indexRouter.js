const colorRouter = require('./api/colorRouter');
const patternRouter = require('./api/patternRouter');
const pictureRouter = require('./api/pictureRouter');
const socksRouter = require('./api/socksRouter');

const indexRouter = require('express').Router();

indexRouter.use('/pictures', pictureRouter);
indexRouter.use('/colors', colorRouter);
indexRouter.use('/patterns', patternRouter);
indexRouter.use('/socks', socksRouter);

module.exports = indexRouter;
