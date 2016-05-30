const { guest, shipper, system, admin } = require('config').roles;

module.exports = {
  login: true, // public action
  logout: guest, // private action
  check: guest, // private action

  // routes for check ACL
  '*': false, // private action for guest role
  '': guest, // private action for guest role
  checkguest: guest, // private action for guest role
  checkshipper: shipper, // private action for shipper role
  checksystem: system, // private action for system role
  checkadmin: admin, // private action for admin role
};
