const route = require('express').Router()
const UserController = require('../controllers/user')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.put('/logout', UserController.logout)
route.get('/users/location', UserController.getUsersLocation)
route.post('/users/track', UserController.trackMyLocation)

module.exports = route