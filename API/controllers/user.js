require('dotenv').config()

const User = require('../models/user')
class UserController {
    static register(req, res) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            latitude: 0,
            longitude: 0,
            locationSharing: false
        })
        user.save()
            .then(() => {
                res.send({ message: 'new User Added' })
            })
            .catch(err => console.log(err))
    }
    static login(req, res) {
        const query = {
            email: req.body.email,
            password: req.body.password
        }
        const update = {
            locationSharing: true
        }
        User.findOneAndUpdate(query, update)
            .then(result => {
                res.send({ message: query.email + " Logged In" })
            })
            .catch(err => res.status(404))
    }
    static logout(req, res) {
        const query = {
            email: req.body.email,
            password: req.body.password
        }
        const update = {
            locationSharing: false,
            latitude: 0,
            longitude: 0
        }
        User.findOneAndUpdate(query, update)
            .then(result => {
                res.send({ message: query.email + " Logged Out" })
            })
            .catch(err => console.log(err))
    }
    static trackMyLocation(req, res) {
        const query = {
            email: req.body.email,
            password: req.body.password
        }
        const update = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }
        User.findOneAndUpdate(query, update)
            .then(result => {
                res.send()
            })
            .catch(err => console.log(err))
    }
    static getUsersLocation(req, res) {
        const query = {
            locationSharing: true
        }
        User.find(query)
            .then(result => {
                const response = result.map(item => ({ name: item.name, longitude: item.longitude, latitude: item.latitude }))
                res.send({ message: "Success", data: response })
            })
            .catch(err => console.log(err))
    }
}

module.exports = UserController