'use strict';

const log = require('../libs/log');
const config = require('config');

module.exports = async (ctx) => {
  log.info('notFound');
  ctx.status = 404;
  ctx.body = {
    app: config.app.name,
    error: 'Not Found',
    version: config.version,
  };
};
