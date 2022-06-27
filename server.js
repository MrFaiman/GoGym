require("dotenv").config();
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const router = require("./api");

(async () => {
	try {
		await nextApp.prepare();
		const app = express();
		app.all(/^\/(?!api).*/, (req, res) => {
			return handle(req, res);
		});
		app.use("/api", router);
		app.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on localhost:${port}`);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
