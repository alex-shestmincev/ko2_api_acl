'use strict';
const config = require('config');
const emailReg = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/;

exports.checkEmail = function checkEmail(value) {
  return emailReg.test(value);
};

exports.emailParse = (email) => {
  let value;
  if (emailReg.test(email)) value = email;
  else value = null;

  return value;
};

exports.statuses = {
  inactive: 'inactive',
  active: 'active',
};

exports.roles = config.roles;

exports.getUserData = function getUserData(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role,
  };
};
