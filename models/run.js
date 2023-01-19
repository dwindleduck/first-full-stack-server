const mongoose = require("mongoose")

const Schema = mongoose.Schema

const runSchema = new Schema({
    //rules
    discription: {
        type: String,
        required: true
    },
    distance: { //miles
        type: Number,
        required: true
    },
    surface: {
        type: String,
        required: true,
        enum: ["road", "trail", "sand"]
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    duration: { //minutes
        type: Number,
        required: true,
    },
    averageSpeed: { //mph
        type: Number,
        required: true
    }
},{
    //options
    timestamps: true
})

//mongosh collection will be 'characters'
const Run = mongoose.model("Run", runSchema)

module.exports = Run