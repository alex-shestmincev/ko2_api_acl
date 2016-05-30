
process.env.NODE_ENV = 'test';
const app = require('../../../index');
const should = require('should');
// const config = require('config');
const request = require('co-supertest').agent(app.listen());

const UserModel = require('../userModel');

const userFixtures = require('./userFixtures');
const getToken = require('../../../libs/jwtToken').getToken;
const { statuses } = require('../helpers');

function getRandEmail() {
  return `${Math.random()}@gmail.com`;
}

describe('Users api', () => {
  before(async () => {
    await UserModel.remove({});
  });

  describe('POST /user/login', () => {
    let user;
    before(async () => {
      const userData = userFixtures.someUser;
      user = await UserModel.create(userData);
    });

    after(async () => {
      UserModel.remove({ _id: user._id });
    });

    it('should not login user (user is not active)', async () => {
      user.status = statuses.inactive;
      await user.save();

      const loginResponse = await request.post('/user/login')
        .send({ email: user.email, password: user.password }).expect(400);
      loginResponse.body.error.should.be.equal('Error while logging in. User is not verified');

      user.status = statuses.active;
      await user.save();
    });

    it('should not login user (invalid password)', async () => {
      const loginResponse = await request.post('/user/login')
        .send({ email: user.email, password: 'invalid' }).expect(400);
      loginResponse.body.error.should.be.equal('Error while logging in. Wrong E-mail or password');
    });

    it('should not login user (wrong email)', async () => {
      const loginResponse = await request.post('/user/login')
        .send({ email: getRandEmail(), password: user.password }).expect(400);
      loginResponse.body.error.should.be.equal('Error while logging in. Wrong E-mail or password');
    });

    it('should login user', async () => {
      const loginResponse = await request.post('/user/login')
        .send({ email: user.email, password: user.password }).expect(200);
      loginResponse.body.token.should.be.String();
      loginResponse.body.logged.should.be.equal(true);
    });
  });

  describe('POST /user/logout', () => {
    let user;
    let tokenLogin;

    before(async () => {
      await UserModel.remove({ _id: userFixtures.someUser._id });
      user = await UserModel.create(userFixtures.someUser);
    });

    beforeEach(async () => {
      tokenLogin = getToken(user, 'test');
    });

    after(async () => {
      await UserModel.remove({ _id: userFixtures.someUser._id });
    });

    it('should not logout user (auth failed)', async () => {
      const response = await request.post('/user/logout').send({}).expect(401);
      response.body.error.should.be
        .equal('Protected resource, use Authorization header to get access');
    });

    it('should logout user', async () => {
      const response = await request.post('/user/logout').send({})
        .set('user-agent', 'test')
        .set('authorization', `Bearer ${tokenLogin}`)
        .expect(200);
      should(response.body.token).be.Null();

      const checkUser = await UserModel.findById(user._id);
      should((new Date(checkUser.logoutedAt)).getTime())
        .be.equal((new Date(response.body.logoutedAt)).getTime());

      const checkResponse = await request.get('/user/check').send({})
        .set('authorization', `Bearer ${tokenLogin}`)
        .expect(401);
      checkResponse.body.error.should.be
        .equal('Protected resource, use Authorization header to get access');
    });
  });

  describe('GET /user/check', () => {
    let user;
    let tokenLogin;

    before(async () => {
      await UserModel.remove({ _id: userFixtures.someUser._id });
      user = await UserModel.create(userFixtures.someUser);
    });

    beforeEach(async () => {
      tokenLogin = getToken(user, 'test');
    });

    after(async () => {
      await UserModel.remove({ _id: userFixtures.someUser._id });
    });

    it('should not check user (auth failed)', async () => {
      const response = await request.get('/user/check').expect(401);
      response.body.error.should.be
        .equal('Protected resource, use Authorization header to get access');
    });

    it('should check user', async () => {
      const response = await request.get('/user/check')
        .set('user-agent', 'test')
        .set('authorization', `Bearer ${tokenLogin}`)
        .expect(200);
      should(response.body.user._id.toString()).be.equal(user._id.toString());
    });
  });
});
