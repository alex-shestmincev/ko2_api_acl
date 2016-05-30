'use strict';

const inherits = require('util').inherits;

const AppError = function AppError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};
inherits(AppError, Error);

const HttpError = function HttpError(status, message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = status;
  this.message = message;
  this.extra = extra;
};
inherits(HttpError, AppError);

const ServiceError = function ServiceError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};
inherits(ServiceError, AppError);

const ModelError = function ModelError(message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};
inherits(ModelError, AppError);

module.exports = {
  AppError,
  HttpError,
  ServiceError,
  ModelError,
};
