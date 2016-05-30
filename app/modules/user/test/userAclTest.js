process.env.NODE_ENV = 'test';
const app = require('../../../index');
// const should = require('should');
// const config = require('config');
const request = require('co-supertest').agent(app.listen());

const UserModel = require('../userModel');

const userFixtures = require('./userFixtures');
const getToken = require('../../../libs/jwtToken').getToken;
const { guest, shipper, system, admin } = require('config').roles;

describe('Check ACL for different roles', () => {
  let userguest;
  let usershipper;
  let usersystem;
  let useradmin;
  let tokenGuest;
  let tokenShipper;
  let tokenSystem;
  let tokenAdmin;

  before(async () => {
    userguest = await UserModel.create(userFixtures.randUserWithRole(guest));
    usershipper = await UserModel.create(userFixtures.randUserWithRole(shipper));
    usersystem = await UserModel.create(userFixtures.randUserWithRole(system));
    useradmin = await UserModel.create(userFixtures.randUserWithRole(admin));

    tokenGuest = getToken(userguest, 'test');
    tokenShipper = getToken(usershipper, 'test');
    tokenSystem = getToken(usersystem, 'test');
    tokenAdmin = getToken(useradmin, 'test');
  });

  after(async () => {
    await UserModel.remove({ _id: { $in:
      [userguest._id, usershipper._id, usersystem._id, useradmin._id] } });
  });

  it('should check GET /user/checkguest for different roles', async () => {
    await request.get('/user/checkguest').expect(401);
    await request.get('/user/checkguest')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(200);
    await request.get('/user/checkguest')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenShipper}`)
      .expect(200);
    await request.get('/user/checkguest')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenSystem}`)
      .expect(200);
    await request.get('/user/checkguest')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
  });

  it('should check GET /user/checkshipper for different roles', async () => {
    await request.get('/user/checkshipper').expect(401);
    await request.get('/user/checkshipper')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(403);
    await request.get('/user/checkshipper')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenShipper}`)
      .expect(200);
    await request.get('/user/checkshipper')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenSystem}`)
      .expect(200);
    await request.get('/user/checkshipper')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
  });

  it('should check GET /user/checksystem for different roles', async () => {
    await request.get('/user/checksystem').expect(401);
    await request.get('/user/checksystem')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(403);
    await request.get('/user/checksystem')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenShipper}`)
      .expect(403);
    await request.get('/user/checksystem')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenSystem}`)
      .expect(200);
    await request.get('/user/checksystem')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
  });

  it('should check GET /user/checkadmin for different roles', async () => {
    await request.get('/user/checkadmin').expect(401);
    await request.get('/user/checkadmin')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(403);
    await request.get('/user/checkadmin')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenShipper}`)
      .expect(403);
    await request.get('/user/checkadmin')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenSystem}`)
      .expect(403);
    await request.get('/user/checkadmin')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenAdmin}`)
      .expect(200);
  });

  it('should check GET /user for different roles', async () => {
    await request.get('/user').expect(401);
    await request.get('/user')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(200);
  });

  it('should check GET /user/1234 for different roles', async () => {
    await request.get('/user/1234').expect(403);
    await request.get('/user/1234')
      .set('user-agent', 'test')
      .set('authorization', `Bearer ${tokenGuest}`)
      .expect(403);
  });
});
