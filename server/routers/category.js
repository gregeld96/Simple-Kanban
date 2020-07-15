const route = require('express').Router()
const controller = require('../controllers/category');
const authentication = require('../middlewares/authentication')

route.use(authentication)
route.post('/add', controller.add);
route.get('', controller.read);

module.exports = route;