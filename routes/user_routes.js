const express = require("express")
const { createUserToken, requireToken } = require('../config/auth')
const bcrypt = require("bcrypt")
const { handle404 } = require("../lib/custom-errors")

const User = require("../models/user")

const router = express.Router()


//INDEX
//Get /users
router.get("/users", requireToken, (req, res, next) => {
    User.find()
        .then(users => {
            //.map turns 
            return users.map(user => user)
        })
        .then(users => {
            res.status(200).json({ users: users })
        })
        .catch(next)
})

//SHOW
//Get /users/:id
router.get("/users/:id", requireToken, (req, res, next) => {
    User.findById(req.params.id)
        .then(handle404) 
        .then(user => {
            res.status(200).json({ user: user})
        })
        .catch(next)

})

//CREATE
//Post /users
router.post("/users", requireToken, (req, res, next) => {
    //req.body will have character with something in it
    User.create(req.body.user)
        .then(user => {
            res.status(201).json({ user: user }) 
        })
        .catch(next)
})

//UPDATE
//PATCH /users/:id
router.patch("/users/:id", requireToken, (req, res, next) => {
    User.findById(req.params.id)
        .then(handle404) 
        .then(user => {
            return user.updateOne(req.body.user)
        })
        .then(() => res.sendStatus(204)) //success, no content returned
        .catch(next)
})

//DELETE
//DELETE /users/:id
router.delete('/users/:id', requireToken, (req, res, next) => {
	User.findById(req.params.id)
        .then(handle404) 
        .then((user) => {
			user.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})








//Post /sign-up
router.post("/sign-up", (req, res, next) => {
    bcrypt
        .hash(req.body.credentials.password, 10)
        .then(hashedPassword => {
            return {
                email: req.body.credentials.email,
                password: hashedPassword
            }
        })
        .then(user => User.create(user))
        .then(user => {
            //the userSchema strips the password from the JSON
            res.status(201).json({ user: user })
        })
        .catch(next)
})


//Post /sign-in
router.post("/sign-in", (req, res, next) => {
    User.findOne({ email: req.body.credentials.email})
        .then(user => createUserToken(req, user))
        .then(token => res.json({ token: token }))
        .catch(next)
})


module.exports = router