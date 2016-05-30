
'use strict';
const oid = require('../../../libs/oid');
const randomInt = require('random-int');
const { statuses, roles } = require('../helpers');

exports.someUser = {
  _id: oid('some_user'),
  name: 'Some name',
  email: `${Math.random()}@gmail.com`,
  password: '111111',
  salt: 'c07f29c63822fd0fab27fb39495783013f9840245cc84102e7d85d0572d23cce',
  status: statuses.active,
  role: roles.guest,
};


exports.randUser = (email) => {
  const id = randomInt(1, 1000);
  email = email || `${Math.random()}@gmail.com`;

  return {
    _id: oid(`some_user${id}`),
    name: `Some name #${id}`,
    email,
    password: '111111',
    salt: 'c07f29c63822fd0fab27fb39495783013f9840245cc84102e7d85d0572d23cce',
    status: statuses.active,
    role: roles.guest,
  };
};

exports.randUserWithRole = (role) => {
  const id = randomInt(1, 1000);
  const email = `${Math.random()}@gmail.com`;

  return {
    _id: oid(`some_user${id}`),
    name: `Some name #${id}`,
    email,
    password: '111111',
    salt: 'c07f29c63822fd0fab27fb39495783013f9840245cc84102e7d85d0572d23cce',
    status: statuses.active,
    role: role || roles.guest,
  };
};
