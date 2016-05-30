'use strict';

const Koa = require('koa');

const convert = require('koa-convert');
const cors = require('koa-cors');
const koaQs = require('koa-qs');

const mount = require('koa-mount');
const UserModule = require('./modules/user');

const bodyParser = require('./middlewares/bodyParser');
const errorHandler = require('./middlewares/errorHandler');
const notFoundMiddleware = require('./middlewares/notFound');
const saveHostUrlMdlw = require('./middlewares/saveHostUrl');

const app = new Koa();

app.use(errorHandler);
app.use(convert(cors()));
koaQs(app);
app.use(bodyParser);
app.use(saveHostUrlMdlw);

app.use(mount('/user', UserModule));
app.use(notFoundMiddleware);

module.exports = app;
