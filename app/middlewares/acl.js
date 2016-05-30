'use strict';

const config = require('config');
const userRoles = config.userRoles;
const HttpError = require('../libs/errors').HttpError;
const log = require('../libs/log');
const checkTokenMdlw = require('./checkToken');

module.exports = (policies) => {
  return async (ctx, next) => {
    const action = ctx.request.url.split('/')[1];
    const role = policies[action] || policies['*'];
    const checkRole = Object.keys(userRoles).indexOf(role) !== -1;

    if (role === true) { // public action
      await next();
    } else if (role === false || !checkRole) {
      throw new HttpError(403, `Unknown role for action ${action} - ${policies[action]}`);
    } else if (checkRole) {
      await checkTokenMdlw(ctx, async () => {
        const checkUserRole = userRoles[ctx.state.user.role];
        const policyRole = userRoles[role];

        if (checkUserRole.value >= policyRole.value) {
          await next();
        } else {
          log.warn(`User with role ${checkUserRole.title}
            cannot access action ${action} (need role ${policyRole.title})`);
          throw new HttpError(403, 'You have no access to this action');
        }
      });
    }
  };
};
