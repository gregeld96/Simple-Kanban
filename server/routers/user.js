const route = require('express').Router();
const controller = require('../controllers/user');

route.get('', controller.read);
route.post('/register', controller.register);
route.post('/login', controller.login);

module.exports = route;