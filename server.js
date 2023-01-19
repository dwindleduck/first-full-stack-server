// command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const runRoutes = require("./routes/run_routes")

const db = require('./config/db')
const PORT = 8000

// deprecation warning
mongoose.set('strictQuery', true)

// creates the connection between your local MongoDB and this express app
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// starting an express app
const app = express()

app.use(cors({ origin: "http://127.0.0.1:5502" }))

// sending json 
// need to be able to accept json
app.use(express.json())
app.use(runRoutes)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

module.exports = app