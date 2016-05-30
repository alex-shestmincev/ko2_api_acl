'use strict';
const parse = require('co-body');

module.exports = async (ctx, next) => {
  if (['POST', 'PUT'].indexOf(ctx.method) !== -1 && ctx.request.header['content-type']) {
    ctx.state.body = await parse(ctx, { limit: '1000kb' });
  }

  await next();
};
