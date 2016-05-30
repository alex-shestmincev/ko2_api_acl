'use strict';

const userRoles = {
  guest: { title: 'guest', value: 0 },
  system: { title: 'system', value: 20 },
  admin: { title: 'admin', value: 100 },
};
exports.userRoles = userRoles;

const roles = {};
Object.keys(userRoles).forEach((key) => {
  roles[key] = key;
});

exports.roles = roles;
