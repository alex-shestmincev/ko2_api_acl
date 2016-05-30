'use strict';

module.exports = {
  isTest: true,
  mongoose: {
    uri: 'mongodb://localhost/koa2_test',
    logSlow: true, // log slow queries
    slowTime: 200, // slow queries - queries, that took more than slowTime (milliseconds)
  },
};
