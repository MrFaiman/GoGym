const router = require("express").Router();

const isAuth = (req, res, next) => {
	if (req.user) return next();
	return res.sendStatus(401);
};

const User = require("../db/models/User");
const Workout = require("../db/models/Workout");

const getWorkouts = () => {
	return Workout.find(
		{ date: { $gte: Date.now() } },
		{},
		{ sort: { createdAt: -1 } }
	);
};

router.post(`/settings`, isAuth, async (req, res) => {
	try {
		const user = await User.updateOne(
			{ username: req.user.username },
			{
				workout: req.body,
			}
		);
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
});

router.post(`/create`, isAuth, async (req, res) => {
	try {
		await Workout.create({
			date: req.body.date,
			creator: req.user.id,
			participants: [{ id: req.user.id, name: req.user.username }],
		});

		const workouts = await getWorkouts();

		res.send(workouts).status(201);
	} catch {
		res.sendStatus(500);
	}
});

router.get("/", async (req, res) => {
	try {
		const workouts = await getWorkouts();
		res.send(workouts);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.post("/join", isAuth, async (req, res) => {
	try {
		await Workout.updateOne(
			{
				_id: req.body.workoutId,
			},
			{
				$push: {
					participants: {
						id: req.user.id,
						name: req.user.username,
						workoutType: req.body.workoutType,
					},
				},
			}
		);

		const workouts = await getWorkouts();

		res.send(workouts);
	} catch (err) {
		res.sendStatus(500);
	}
});

router.post("/leave", isAuth, async (req, res) => {
	try {
		await Workout.updateOne(
			{
				_id: req.body.workoutId,
			},
			{
				$pull: {
					participants: {
						id: req.user.id,
						name: req.user.username,
					},
				},
			}
		);

		const workouts = await getWorkouts();

		res.send(workouts);
	} catch (err) {
		res.sendStatus(500);
	}
});

module.exports = router;
