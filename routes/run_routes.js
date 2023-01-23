const express = require("express")

const { handle404 } = require("../lib/custom-errors")
const { requireToken } = require('../config/auth')

const User = require("../models/user")
const router = express.Router()




// CREATE //
// POST /runs
router.post('/runs', requireToken, (req, res, next) => {
	const userId = req.body.run.userId
	// console.log(req.user)
	
	const run = req.body.run
	//run.owner = req.user._id
	
	//find the comapaign
	User.findById(userId)
		.then(handle404)
		.then(user => {
			//push the run into the mongoose array
			user.runs.push(run)
			//have to save the doc when modified
			return user.save()
		})
		.then(user => {
			res.status(201).json({ user: user})
		})
		.catch(next)
	
})

// UPDATE
// PATCH /runs/5a7db6c74d55bc51bdf39793
router.patch('/runs/:runId', requireToken, (req, res, next) => {
	const userId = req.body.run.userId
	const runBody = req.body.run

	//find the comapaign
	User.findById(userId)
		.then(handle404)
		.then(user => {
			
			const run = user.runs.id(req.params.runId)
			
			run.set(runBody)
	
			return user.save()
		})
		.then(() => {
			res.sendStatus(204)
		})    
		.catch(next)
})

// DESTROY
// DELETE /runs/5a7db6c74d55bc51bdf39793
router.delete('/runs/:runId', requireToken, (req, res, next) => {
	const userId = req.body.run.userId

	//find the comapaign
	User.findById(userId)
		.then(handle404)
		.then(user => {
			console.log(user)
			user.runs.id(req.params.runId).remove()
			return user.save()
		})     
		.then(() => res.sendStatus(204))
		.catch(next)
})










// //INDEX
// //Get /runs
// router.get("/runs", (req, res, next) => {
//     Run.find()
//         .then(runs => {
//             //.map turns 
//             return runs.map(run => run)
//         })
//         .then(runs => {
//             res.status(200).json({ runs: runs })
//         })
//         .catch(next)
// })

// //SHOW
// //Get /runs/:id
// router.get("/runs/:id", (req, res, next) => {
//     Run.findById(req.params.id)
//         .then(handle404) 
//         .then(run => {
//             res.status(200).json({ run: run})
//         })
//         .catch(next)

// })

// //CREATE
// //Post /runs
// router.post("/runs", (req, res, next) => {
//     //req.body will have character with something in it
//     Run.create(req.body.run)
//         .then(run => {
//             res.status(201).json({ run: run }) 
//         })
//         .catch(next)
// })

// //UPDATE
// //PATCH /runs/:id
// router.patch("/runs/:id", (req, res, next) => {
//     Run.findById(req.params.id)
//         .then(handle404) 
//         .then(run => {
//             return run.updateOne(req.body.run)
//         })
//         .then(() => res.sendStatus(204)) //success, no content returned
//         .catch(next)
// })

// //DELETE
// //DELETE /runs/:id
// router.delete('/runs/:id', (req, res, next) => {
// 	Run.findById(req.params.id)
//         .then(handle404) 
//         .then((run) => {
// 			run.deleteOne()
// 		})
// 		.then(() => res.sendStatus(204))
// 		.catch(next)
// })



module.exports = router