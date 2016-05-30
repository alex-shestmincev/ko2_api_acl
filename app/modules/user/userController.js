'use strict';

const getToken = require('../../libs/jwtToken').getToken;
const UserService = require('../user/userService');
const userHelpers = require('../user/helpers');
const HttpError = require('../../libs/errors').HttpError;

const assert = require('assert');

exports.Login = async (ctx) => {
  try {
    const user = await UserService.Login(ctx.state.body);

    ctx.body = {
      token: getToken(user, ctx.request.header['user-agent']),
      logged: true,
      user: userHelpers.getUserData(user),
    };
    ctx.status = 200;
  } catch (er) {
    throw new HttpError(400, er.message);
  }
};

exports.Logout = async (ctx) => {
  assert(ctx.state.user, 'User should be defined before Logout');
  try {
    const user = await UserService.Logout(ctx.state.user);

    ctx.body = { token: null, logoutedAt: user.logoutedAt };
    ctx.status = 200;
  } catch (er) {
    throw new HttpError(400, er.message);
  }
};


exports.Check = async (ctx) => {
  assert(ctx.state.user, 'User should be defined before Check');
  ctx.body = { status: true, user: userHelpers.getUserData(ctx.state.user) };
};
