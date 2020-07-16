const route = require('express').Router();
const controller = require('../controllers/user');
const authentication = require('../middlewares/authentication')

route.post('/register', controller.register);
route.post('/login', controller.login);
route.post('/google', controller.googleLogin);
route.use(authentication)
route.get('/', controller.read);

module.exports = route;