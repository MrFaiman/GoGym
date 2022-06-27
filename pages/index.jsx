import React from "react";
import {
	Box,
	Button,
	Divider,
	Group,
	Modal,
	MultiSelect,
	Paper,
	ScrollArea,
	Select,
	Stack,
	Title,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import Api from "utils/api";
import { useRouter } from "next/router";
import { Event } from "components";
import { showNotification } from "@mantine/notifications";

const Home = () => {
	const router = useRouter();
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [addModalOpen, setAddModalOpen] = React.useState(false);
	const [workoutModal, setWorkoutModal] = React.useState({
		days: [],
		type: "fullbody",
		time: new Date(),
	});
	const [createWorkout, setCreateWorkout] = React.useState({
		date: new Date(),
		time: new Date(),
	});

	const [workouts, setWorkouts] = React.useState([]);

	React.useEffect(() => {
		Api.auth()
			.then((res) => {
				console.log("HOME USER FETCH", res);
				setUser(res.data);
				setWorkoutModal({
					...workoutModal,
					days: res.data.workout.days,
					time: res.data.workout.time,
					type: res.data.workout.type,
				});
				setLoading(false);
			})
			.catch(() => {
				router.push("/login");
			});
	}, []);

	React.useEffect(() => {
		Api.getWorkouts().then((res) => {
			setWorkouts(res.data);
		});
	}, []);

	const saveWorkoutSettings = () => {
		Api.saveWorkoutSettings(workoutModal).then((res) => {
			console.log("SAVE WORKOUT SETTINGS", workoutModal);
			showNotification({
				color: "green",
				message: "Workout settings saved",
			});
		});
	};

	const createWorkoutHandle = () => {
		if (Date.now() > createWorkout.date.getTime())
			return showNotification({
				color: "red",
				message: "Date or is invalid",
			});
		let finalDate = createWorkout.date.setHours(
			createWorkout.time.getHours()
		);
		finalDate = new Date(finalDate).setMinutes(
			createWorkout.time.getMinutes()
		);
		Api.createWorkout(finalDate).then((res) => {
			console.log("CREATE WORKOUT", finalDate);
			setAddModalOpen(false);
			showNotification({
				color: "green",
				message: "Workout created",
			});
			setWorkouts(res.data);
		});
	};

	return (
		!loading && (
			<>
				<Modal
					opened={modalOpen}
					onClose={() => setModalOpen(false)}
					centered
					title={"Your workout settings"}
				>
					<Stack>
						<MultiSelect
							label="Your GYM routine"
							placeholder="Pick the days you go to the GYM"
							searchable
							data={[
								{ value: "sunday", label: "Sunday" },
								{ value: "monday", label: "Monday" },
								{ value: "tuesday", label: "Tuesday" },
								{ value: "wednesday", label: "Wednesday" },
								{ value: "thursday", label: "Thursday" },
								{ value: "friday", label: "Friday" },
								{ value: "saturday", label: "Saturday" },
							]}
							defaultValue={workoutModal.days}
							onChange={(value) =>
								setWorkoutModal({
									...workoutModal,
									days: value,
								})
							}
							required
						/>
						<TimeInput
							value={new Date(workoutModal.time)}
							label="Pick the time you go"
							amLabel="am"
							pmLabel="pm"
							onChange={(value) =>
								setWorkoutModal({
									...workoutModal,
									time: new Date(value).getTime(),
								})
							}
						/>
						<Select
							label={"Workout type"}
							searchable
							data={[
								{ value: "fullbody", label: "Full body" },
								{ value: "ab", label: "AB" },
								{ value: "abc", label: "ABC" },
							]}
							defaultValue={workoutModal.type}
							onChange={(value) =>
								setWorkoutModal({
									...workoutModal,
									type: value,
								})
							}
						/>
						<Button
							radius={"lg"}
							color={"green"}
							onClick={saveWorkoutSettings}
						>
							Save
						</Button>
					</Stack>
				</Modal>

				<Modal
					opened={addModalOpen}
					onClose={() => setAddModalOpen(false)}
					centered
					title={"Create workout"}
				>
					<Stack>
						<DatePicker
							label={"Pick a date"}
							value={createWorkout.date}
							required
							onChange={(values) =>
								setCreateWorkout({
									...createWorkout,
									date: values,
								})
							}
						/>
						<TimeInput
							value={createWorkout.time}
							label="Pick the time you go"
							amLabel="am"
							pmLabel="pm"
							required
							onChange={(values) =>
								setCreateWorkout({
									...createWorkout,
									time: values,
								})
							}
						/>
						<Button
							radius={"lg"}
							color={"green"}
							onClick={createWorkoutHandle}
						>
							Add
						</Button>
					</Stack>
				</Modal>

				<Stack>
					<Group position="center" p={"md"}>
						<Paper radius={"md"} shadow={"lg"} p={"sm"} withBorder>
							<Title order={2} align="center">
								{user.username}
							</Title>
							<Group position="center" m={"sm"}>
								<Button
									size={"md"}
									radius={"lg"}
									variant={"subtle"}
									onClick={() => setModalOpen(true)}
								>
									Your schedule
								</Button>
								<Button
									size={"md"}
									radius={"lg"}
									color="red"
									variant={"light"}
									onClick={() =>
										router.push(
											`${Api.API_URL}/auth/logout`
										)
									}
								>
									Logout
								</Button>
							</Group>
						</Paper>
					</Group>
					<Divider my={"sm"} />
					<Box>
						<Title order={2} align="center">
							Events
						</Title>
						<ScrollArea p={"md"} style={{ height: "50vh" }}>
							{workouts.map((data, i) => (
								<Event
									key={i}
									data={data}
									user={user}
									setWorkouts={setWorkouts}
								/>
							))}
						</ScrollArea>
					</Box>
					<Group position={"center"}>
						<Button
							radius={"xl"}
							color={"green"}
							size={"lg"}
							onClick={() => setAddModalOpen(true)}
						>
							Create workout
						</Button>
					</Group>
				</Stack>
			</>
		)
	);
};

export default Home;
