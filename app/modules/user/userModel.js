'use strict';

const crypto = require('crypto');
const userHelpers = require('./helpers');
const Db = require('../../libs/Db');
const log = require('../../libs/log');
const { roles: userRoles } = userHelpers;

const BaseSchema = require('../_common/baseSchema');

const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [
      {
        validator: userHelpers.checkEmail,
        msg: 'Invalid E-mail',
      },
    ],
  },
  role: {
    type: String,
    default: userRoles.guest,
  },
  status: {
    type: String,
    default: userHelpers.statuses.inactive,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logoutedAt: Date,
});

userSchema.virtual('password')
  .set(function virtualPassword(password) {
    if (!password) throw new Error('No password found');
    password = password.toString();

    this.plainPassword = password;
    this.salt = crypto.createHmac('sha256', Math.random().toString()).digest('hex');
    this.passwordHash = crypto.createHmac('sha256', this.salt).update(password).digest('hex');
  })
  .get(function get() {
    return this.plainPassword;
  });

userSchema.methods.checkPassword = function checkPassword(password) {
  if (!password) return false;
  password = password.toString();
  if (!this.passwordHash) return false;
  const cryptPass = crypto.createHmac('sha256', this.salt).update(password).digest('hex');
  const checkPass = cryptPass === this.passwordHash;
  return checkPass;
};


const UserModel = Db.model('User', userSchema);

// create guest user
async function createGuestUser() {
  const testData = { name: 'guest', email: 'guest@test.com', password: '111111',
    status: userHelpers.statuses.active };
  const check = await UserModel.findOne({ email: testData.email });
  if (!check) {
    const testUser = await UserModel.create(testData);
    log.info(`Test user with email ${testUser.email} is created`);
  }
}
createGuestUser();

module.exports = UserModel;
