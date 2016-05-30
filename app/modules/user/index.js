'use strict';

const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');
const Router = require('koa-router')();

const policies = require('./policies');
const aclMdlw = require('../../middlewares/acl');
const UserController = require('./userController');

Router.post('/login', UserController.Login);
Router.post('/logout', UserController.Logout);
Router.get('/check', UserController.Check);

// Routes for test ACL
Router.get('/checkguest', UserController.Check);
Router.get('/checkshipper', UserController.Check);
Router.get('/checksystem', UserController.Check);
Router.get('/checkadmin', UserController.Check);
Router.get('', UserController.Check);
Router.get('/:someId', UserController.Check);

app.use(aclMdlw(policies));
app.use(convert(Router.routes()));
app.use(convert(Router.allowedMethods()));

module.exports = app;
