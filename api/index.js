const express = require("express");
const app = express.Router();

const cors = require("cors");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
require("./db");

const day = 1000 * 60 * 60 * 24;
const sessionStore = MongoStore.create({
	mongoUrl: process.env.MOGNO_URI,
});
const session = expressSession({
	secret: process.env.SESSION_SECERET,
	resave: true,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: day * 30,
	},
});

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(cookieParser(process.env.SESSION_SECERET));
app.use(passport.initialize());
app.use(passport.session());
require("./strategies/local")(passport);

app.get("/", (req, res) => {
	res.send({
		online: true,
	});
});

app.use("/auth", require("./routes/auth"));
app.use("/workout", require("./routes/workout"));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((id, done) => {
	done(null, id);
});

module.exports = app;
