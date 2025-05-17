const express = require('express');
const serverConfig = require('./config/serverConfig');
const errorMiddleware = require('./middlewares/errorMiddleware');
const indexRouter = require('./routes/indexRouter');

const app = express();

serverConfig(app);

app.use('/api', indexRouter);
app.use(errorMiddleware);

module.exports = app;
