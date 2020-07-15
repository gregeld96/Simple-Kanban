const route = require('express').Router();
const userRoute = require('./user');
const taskRoute = require('./task');
const categoryRoute = require('./category')


route.use('/', userRoute);
route.use('/tasks', taskRoute);
route.use('/categories', categoryRoute);

module.exports = route