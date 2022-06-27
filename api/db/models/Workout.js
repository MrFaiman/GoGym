const mongoose = require("mongoose");

const Workout = mongoose.Schema(
	{
		name: {
			type: String,
			default: "GYM",
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		date: {
			type: Number,
			required: true,
		},
		participants: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Workout", Workout);
