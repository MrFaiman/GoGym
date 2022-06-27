const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			User.findOne({ username }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: "Incorrect username",
					});
				}
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) {
						return done(err);
					}
					if (!isMatch) {
						return done(null, false, {
							message: "Incorrect password",
						});
					}
					return done(null, user);
				});
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);
			if (!user) throw new Error("User not found");
			let userData = {
				id,
				username: user.username,
				workout: user.workout,
				createdAt: user.createdAt,
			};
			done(null, userData);
		} catch (err) {
			done(err, null);
		}
	});
};
