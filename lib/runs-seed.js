const express = require('express')

const User = require('../models/user')

const router = express.Router()

const seed = [
    {
        email: "bob@un.com",
        password: "bob",
        runs: [{
            discription: "7.7 Mile Forest Challenge",
            distance: 7.7,
            surface: "trail",
            difficulty: 5,
            duration: 89,
            averageSpeed: 7
        }, {
            discription: "Run to Work",
            distance: 4.2,
            surface: "road",
            difficulty: 3,
            duration: 35,
            averageSpeed: 7
        }]
    },   
    {
        email: "bet@un.com",
        password: "bob",
        runs: [{
            discription: "Around an Island",
            distance: 3,
            surface: "sand",
            difficulty: 6,
            duration: 43,
            averageSpeed: 3
        }]
    },
    {
        email: "bing@un.com",
        password: "bob",
        runs: [{
            discription: "Up a Mountain",
            distance: 5,
            surface: "trail",
            difficulty: 8,
            duration: 75,
            averageSpeed: 5
        },{
            discription: "Up a Mountain",
            distance: 5,
            surface: "trail",
            difficulty: 8,
            duration: 80,
            averageSpeed: 5.5
        }]
    }
]

router.get("/runs", (req, res, next) => {
    User.deleteMany({})
        .then(() => {
            User.create(seed)
                .then((user) => res.status(200).json({ user: user }))
        })
        .catch(next)
})

module.exports = router