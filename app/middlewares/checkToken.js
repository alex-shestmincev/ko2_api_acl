'use strict';
const HttpError = require('../libs/errors').HttpError;
const log = require('../libs/log');
const jwt = require('koa-jwt');
const config = require('config');
const UserModel = require('../modules/user/userModel');

const assert = require('assert');
const compose = require('koa-convert').compose;


async function getUserData(ctx, next) {
  assert(ctx.state.jwtdata._id, 'User token should be verified before userDBdata');

  try {
    const user = await UserModel.findById(ctx.state.jwtdata._id).lean();

    if (!user) throw new HttpError(401, 'User not found by your token ID');

    const logoutedAt = (new Date(user.logoutedAt)).getTime();
    const loggedAt = (new Date(ctx.state.jwtdata.loggedAt)).getTime();

    if (loggedAt < logoutedAt) {
      log.warn(`loggedAt ${loggedAt} < logoutedAt ${logoutedAt}. return 401`);
      throw new HttpError(401, 'User had logged out');
    }

    if (ctx.state.jwtdata.userAgent !== ctx.request.header['user-agent']) {
      log.warn(`user's token userAgent (${ctx.state.jwtdata.userAgent})
        is not equal to request user-agent ${ctx.request.header['user-agent']}. return 401`);
      throw new HttpError(401, 'User had logged out');
    }

    ctx.state.user = user;
  } catch (err) {
    throw err;
  }

  await next();
}

module.exports = compose(
  jwt({ secret: config.secret, key: 'jwtdata' }),
  getUserData
);
