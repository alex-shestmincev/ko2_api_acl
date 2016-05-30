'use strict';

const winston = require('winston');
const path = require('path');

function timestamp() {
  const d = new Date();
  return d.toLocaleTimeString('en-US', { hour12: false }) + '.' + d.getMilliseconds() + ' ' + d.toLocaleDateString();
}

function formatter(options) {
  // Return string will be passed to logger.
  return timestamp() + ' ' + options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}

let transports = [];

const infoFile = new (winston.transports.File)({
  name: 'info-file',
  filename: path.join(__dirname, './../../logs/info.log'),
  level: 'info',
  json: false,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

const infoConsole = new (winston.transports.Console)({
  name: 'info-console',
  level: 'info',
  handleExceptions: true,
  formatter,
  colorize: true,
});

const errorFile = new (winston.transports.File)({
  name: 'error-file',
  filename: path.join(__dirname, './../../logs/error.log'),
  level: 'error',
  json: false,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

const errorConsole = new (winston.transports.Console)({
  name: 'error-console',
  level: 'error',
  handleExceptions: true,
  formatter,
  colorize: true,
});

const debugFile = new (winston.transports.File)({
  name: 'debug-file',
  filename: path.join(__dirname, './../../logs/debug.log'),
  level: 'debug',
  json: false,
  maxsize: 5242880,
  maxFiles: 5,
});

const debugConsole = new (winston.transports.Console)({
  level: 'debug',
  handleExceptions: true,
  formatter,
  colorize: true,
});

const warnFile = new (winston.transports.File)({
  name: 'warn-file',
  filename: path.join(__dirname, './../../logs/warn.log'),
  level: 'warn',
  json: false,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

const warnConsole = new (winston.transports.Console)({
  name: 'warn-console',
  level: 'warn',
  handleExceptions: true,
  formatter,
  colorize: true,
});

if (process.env.NODE_ENV === 'production') {
  transports = [infoConsole, warnConsole, errorConsole];
} else if (process.env.NODE_ENV === 'test') {
  transports = [infoFile, errorFile, debugFile,
    errorConsole,
     // warnConsole,
     // debugConsole,
     // infoConsole
  ];
} else {
  transports = [infoConsole, errorConsole, debugConsole, infoFile, errorFile,
    debugFile, warnFile, warnConsole];
}

winston.addColors({ debug: 'green', info: 'blue', warn: 'yellow', error: 'red' });

const log = new (winston.Logger)({
  transports,
});

module.exports = log;
