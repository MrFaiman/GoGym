const mongoose = require("mongoose");

mongoose.connect(
	process.env.MOGNO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("MongoDB has connected successfully.");
		}
	}
);
