const mongoose = require("mongoose");

const User = mongoose.Schema(
	{
		role: {
			type: Number,
			default: 0,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		workout: {
			time: {
				type: Number,
				default: 0,
			},
			type: {
				type: String,
				default: "fullbody",
			},
			days: {
				type: Array,
				default: [],
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", User);
