'use strict';

module.exports = {
  port: process.env.PORT || 3333,
  isDevelopment: true,
  mongoose: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/koa2_dev',
  },
};
