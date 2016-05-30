'use strict';

let hostUrl = '';
const version = require('../package.json').version;

module.exports = {
  version,
  app: {
    name: 'koa2_app_acl',
    get host() { return hostUrl; },
    set host(url) {
      hostUrl = url;
    },
  },
  secret: '%$@#*^*(#)VVKBSJADBHA',
  port: 3333,
  mongoose: {
    uri: 'mongodb://localhost/ko2_dev',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
        poolSize: 5,
      },
    },
    logSlow: true, // log slow queries
    slowTime: 200, // slow queries - queries, that took more than slowTime (milliseconds)
  },
  crypto: {
    hash: {
      length: 128,
      iterations: process.env.NODE_ENV === 'production' ? 12000 : 1,
    },
  },
  roles: require('./roles').roles,
  userRoles: require('./roles').userRoles,
};
