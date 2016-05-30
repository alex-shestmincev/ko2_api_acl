'use strict';

const ServiceError = require('../../libs/errors').ServiceError;
const { statuses } = require('./helpers');
const UserModel = require('./userModel');

exports.Login = async ({ email, password }) => {
  email = email.toLowerCase();
  const user = await UserModel.findOne({ email });
  if (!user || !user.checkPassword(password)) {
    throw new ServiceError('Error while logging in. Wrong E-mail or password');
  }

  if (user.status !== statuses.active) {
    throw new ServiceError('Error while logging in. User is not verified');
  }

  return user;
};

exports.Logout = async (user) => {
  const updata = {
    logoutedAt: new Date(),
  };

  const resUser = await UserModel.findByIdAndUpdate(user._id, updata, { new: true });

  return resUser;
};
