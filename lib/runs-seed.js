const express = require('express')

const Run = require('../models/run')

const router = express.Router()

const startRuns = [
    {
        discription: "7.7 Mile Forest Challenge",
        distance: 7.7,
        surface: "trail",
        difficulty: 5,
        duration: 89,
        averageSpeed: 7
    },
    {
        discription: "Run to Work",
        distance: 4.2,
        surface: "road",
        difficulty: 3,
        duration: 35,
        averageSpeed: 7
    },
    {
        discription: "Around an Island",
        distance: 3,
        surface: "sand",
        difficulty: 6,
        duration: 43,
        averageSpeed: 3
    },
    {
        discription: "Up a Mountain",
        distance: 5,
        surface: "trail",
        difficulty: 8,
        duration: 75,
        averageSpeed: 5
    }
]

router.get("/runs", (req, res, next) => {
    Run.deleteMany({})
        .then(() => {
            Run.create(startRuns)
                .then((runs) => res.status(200).json({ runs: runs }))
        })
        .catch(next)
})

module.exports = router