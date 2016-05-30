'use strict';
const config = require('config');

module.exports = async (ctx, next) => {
  config.app.host = ctx.request.origin;
  await next();
};
