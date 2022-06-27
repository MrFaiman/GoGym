const passport = require("passport");
const bcrypt = require("bcrypt");
const router = require("express").Router();
require("../strategies/local.js");

const User = require("../db/models/User");

router.get("/", (req, res) => {
	return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send({
				msg: info.message,
			});
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			let userData = {
				id: user._id,
				username: user.username,
				workout: user.workout,
				createdAt: user.createdAt,
			};
			return res.send(userData);
		});
	})(req, res, next);
});

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username.length < 3) {
			return res
				.status(400)
				.send({ error: "Username must be at least 3 characters long" });
		}
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).send({ msg: "Username already exists" });
		}
		if (!/\d/.test(password) && password.length < 8) {
			return res.status(400).send({ msg: "Password is invalid" });
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const newUser = new User({
			username,
			password: hash,
		});
		await newUser.save();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.status(500);
	}
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(`${process.env.CLIENT_URL}/login`);
});

module.exports = router;
