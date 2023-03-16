User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const register = (req, res) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        company: req.body.company
    })
    bcrypt.hash(user.password, 10, function(err, hashedPass) {

        user.password = hashedPass
        console.log("Password", user.password)

        if (err) {
            res.json({
                error: err
            })
        }


        user.save()
            .then(user => {
                res.json({
                    message: 'user added Successfully in database'
                })
            })
            .catch(error => {
                res.json({
                    message: 'an error occure'
                })
            })
    })
}

const login = (req, res) => {
    var name = req.body.name
    var password = req.body.password
    User.findOne({ $or: [{ email: name }, { username: name }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({
                            message: 'error'
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ username: user.username }, 'verySecretValue', { expiresIn: '1h' })

                        res.json({
                            message: 'login successful',
                            token
                        })



                    } else {
                        res.json({
                            message: 'password does not matched'

                        })
                    }

                })

            } else {
                res.json({
                    message: "no user found"
                })
            }
        })

}
module.exports = {
    register,
    login
}