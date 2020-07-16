const route = require('express').Router()
const controller = require('../controllers/task');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('', controller.read);
route.post('/add', controller.add);
route.put('/:id', authorization, controller.edit);
route.delete('/:id', authorization, controller.delete);

module.exports = route;