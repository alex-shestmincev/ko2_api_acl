'use strict';

const mongoose = require('mongoose');
const config = require('config');
const log = require('../../libs/log');

module.exports = class BaseSchema extends mongoose.Schema {

  constructor(...params) {
    super(...params);

    this.pre('find', this.preAll);
    this.post('find', this.postAll);
    this.pre('findOne', this.preAll);
    this.post('findOne', this.postAll);
    this.pre('geoNear', this.preAll);
    this.post('geoNear', this.postAll);
  }

  get getSchema() {
    return this.schema;
  }

  preAll = function preAll() {
    this.start = Date.now();
  };

  postAll = function postAll() {
    const diffMillis = Date.now() - this.start;
    if (config.mongoose.logSlow && diffMillis > config.mongoose.slowTime) {
      log.error(`SLOW QUERY took ${diffMillis} millis.
        ${this.model.modelName}.${this.op}`, this._conditions, this.options);
    }
  };
};
