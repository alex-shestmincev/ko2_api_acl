'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');

exports.getToken = function getToken(user, userAgent) {
  let data;
  data = {
    _id: user._id,
    userAgent,
    loggedAt: new Date(),
  };

  return jwt.sign(data, config.secret);
};

exports.verifyToken = (token) => jwt.verify(token, config.secret);
