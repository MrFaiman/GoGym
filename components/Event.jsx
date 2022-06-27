import React from "react";
import { FaUserFriends } from "react-icons/fa";
import {
	Modal,
	Stack,
	Select,
	Button,
	Paper,
	Group,
	Text,
	Popover,
} from "@mantine/core";
import Router from "next/router";
import { showNotification } from "@mantine/notifications";
import Api from "utils/api";

const Event = ({ data, user, setWorkouts }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [modalData, setModalData] = React.useState({
		type: "fullbody",
	});

	const handleGYM = () => {
		Api.joinToWorkout(data._id, modalData).then((res) => {
			console.log("JOINED TO WORKOUT", data._id);
			setModalOpen(false);
			showNotification({
				color: "green",
				message: "You joined to workout",
			});
			setWorkouts(res.data);
			// Router.reload(window.location.pathname);
		});
	};

	const handleLeaveWorkout = () => {
		Api.leaveWorkout(data._id).then((res) => {
			showNotification({
				color: "green",
				message: "You left workout",
			});
			console.log(res.data);
			setWorkouts(res.data);
		});
	};

	const isUserComing = data.participants.some(
		(participant) => participant.id == user.id
	);

	return (
		<>
			<Modal
				opened={modalOpen}
				onClose={() => setModalOpen(false)}
				centered
				title={"Your workout settings"}
			>
				<Stack>
					<Select
						label={"Workout type"}
						searchable
						data={[
							{ value: "fullbody", label: "Full body" },
							{ value: "upperbody", label: "Upper body" },
							{ value: "lowerbody", label: "Lower body" },
							{ value: "core", label: "Core" },
							{ value: "cardio", label: "Cardio" },
						]}
						defaultValue={"fullbody"}
						onChange={(value) => {
							setModalData({
								...modalData,
								type: value,
							});
						}}
					/>
					<Button radius={"lg"} color={"green"} onClick={handleGYM}>
						GYM!
					</Button>
				</Stack>
			</Modal>

			<Paper radius={"md"} withBorder p={"md"} m={"sm"}>
				<Group position="apart">
					<Group spacing={"lg"}>
						<Text size={"xl"} weight={500}>
							GYM
						</Text>
						<Text size={"xl"}>
							{new Date(data.date).toLocaleString()}
						</Text>
					</Group>
					<Group spacing={"lg"}>
						<Popover
							opened={isOpen}
							onClose={() => setIsOpen(false)}
							placement="center"
							withArrow
							trapFocus={false}
							closeOnEscape={false}
							target={
								<Group
									spacing={"xs"}
									onMouseEnter={() => setIsOpen(true)}
									onMouseLeave={() => setIsOpen(false)}
								>
									<Text size={"xl"}>
										{data.participants.length}
									</Text>
									<FaUserFriends size={25} />
								</Group>
							}
						>
							{data.participants.map((participant, i) => (
								<Text key={i}>{participant.name}</Text>
							))}
						</Popover>
						<Button
							radius={"lg"}
							color={isUserComing ? "red" : "green"}
							variant={"light"}
							onClick={() =>
								!isUserComing
									? setModalOpen(true)
									: handleLeaveWorkout()
							}
						>
							{isUserComing ? "Not coming?" : "Coming too?"}
						</Button>
					</Group>
				</Group>
			</Paper>
		</>
	);
};

export default Event;
