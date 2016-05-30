'use strict';

const log = require('./app/libs/log');
const config = require('config');
let app;

if (process.env.NODE_ENV !== 'production') {
  Error.stackTraceLimit = 100;
  // require('trace');
  //require('clarify');
  require('babel-register');
  app = require('./app');
} else {
  app = require('./dist/index');
}

app.listen(config.port, () => {
  log.info(`Listen ${config.port}`);
});
