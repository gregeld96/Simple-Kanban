const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt');

class UserController {
    static read (req, res, next){
        User.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    next(err)
                })
    }

    static register(req, res, next){
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(data => {
                res.status(201).json({name: data.name, msg: `${data.name} successfully joined!`})
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next){
        const {email, password} = req.body

        if(!email || !password){
            next({
                status: 400,
                msg: `Email and Password are required!`
            })
        } else {
            User.findOne({
                    where: {
                        email
                    }
                })
                .then(user => {
                    if(!user) throw ({status: 404, msg: `Email or Password are Invalid`})

                    const checkPassword = comparePassword(password, user.password);
                    if(checkPassword){
                        let access_token = createToken({id: user.id, email: user.email});
                        res.status(200).json({access_token, msg:`User logined in!`})
                    }
                    else throw ({status: 404, msg: `Email or Password are Invalid`})
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    // Google Login Nanti Kalau udah sampe client side
}

module.exports = UserController