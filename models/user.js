const mongoose = require('mongoose')
const runSchema = require("./run")

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			//hashed password results saved here
			type: String,
			required: true,
		},
		//not required
		token: String,
        runs: [runSchema]
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_doc, user) => {
				delete user.password
				return user
			},
		},
	}
)

module.exports = mongoose.model('User', userSchema)
