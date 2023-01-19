const express = require("express")

const Run = require("../models/run")

const router = express.Router()


//INDEX
//Get /runs
router.get("/runs", (req, res, next) => {
    Run.find()
        .then(runs => {
            //.map turns 
            return runs.map(run => run)
        })
        .then(runs => {
            res.status(200).json({ runs: runs })
        })
        .catch(next)
})

//SHOW
//Get /runs/:id
router.get("/runs/:id", (req, res, next) => {
    Run.findById(req.params.id)
        .then(run => {
            res.status(200).json({ run: run})
        })
        .catch(next)

})

//CREATE
//Post /runs
router.post("/runs", (req, res, next) => {
    //req.body will have character with something in it
    Run.create(req.body.run)
        .then(run => {
            res.status(201).json({ run: run }) 
        })
        .catch(next)
})

//UPDATE

//DELETE

module.exports = router