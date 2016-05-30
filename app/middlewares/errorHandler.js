'use strict';
const log = require('../libs/log');
const errors = require('../libs/errors');
const config = require('config');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof errors.HttpError) {
      log.warn('HttpError err', err.message, err.status);
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = { error: 'Protected resource, use Authorization header to get access' };
      } else {
        ctx.status = err.status;
        log.debug('HttpError err', err.message, err.stack);
        ctx.body = { error: err.message };
      }
    } else if (err instanceof errors.ServiceError) {
      log.debug('ServiceError err', err.message, err.stack);
      log.warn('ServiceError err', err.message, err.status);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else if (err instanceof errors.ModelError) {
      log.warn('ModelError err', err.message, err.status);
      log.debug('ModelError err', err.message, err.stack);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else if (err instanceof errors.AppError) {
      log.warn('AppError err', err.message, err.stack);
      ctx.status = 400;
      ctx.body = { error: err.message };
    } else {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = { error: 'Protected resource, use Authorization header to get access' };
      } else {
        if (config.isDevelopment) {
          throw err;
        } else {
          ctx.status = 400;
          log.error('Uncathed error', err.message, err.stack);
          ctx.body = { error: 'Uncatched error' };
        }
      }
    }
  }
};
