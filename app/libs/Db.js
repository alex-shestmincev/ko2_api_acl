const mongoose = require('mongoose');
// if (process.env.NODE_ENV !== 'production') mongoose.set('debug', true);
const config = require('config');
const db = mongoose.createConnection(config.mongoose.uri, config.mongoose.options);

const log = require('./log');

db.on('error', log.error);
db.on('connected', () => {
  log.info('mongoose connected');
});
db.on('disconnected', () => {
  log.info('mongoose disconnected');
});

module.exports = db;
