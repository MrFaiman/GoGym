import { Text, TextInput, Button, Group, Title, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import Api from "utils/api";

const LoginForm = () => {
	const router = useRouter();

	const form = useForm({
		initialValues: {
			username: "",
			password: "",
		},

		validate: {
			username: (value) => {
				if (value.includes(" ")) {
					return "Username cannot contain spaces";
				} else if (value.length < 3) {
					return "Username must be 3 at least characters";
				}
			},
			password: (value) => {
				if (!/\d/.test(value)) {
					return "Password must contain a number";
				} else if (value.length < 8) {
					return "Password must be at least 8 characters";
				}
				return null;
			},
		},
	});

	const handleSubmit = async (values) => {
		Api.login(values.username, values.password).then((res) => {
			router.push("/");
		});
	};

	return (
		<>
			<Title order={1} align={"center"}>
				Login
			</Title>
			<Paper mx="auto" shadow={"xl"} p={"lg"}>
				<form
					onSubmit={form.onSubmit((values) => handleSubmit(values))}
				>
					<TextInput
						name={"username"}
						required
						label="Username"
						placeholder="CoolName"
						size={"lg"}
						{...form.getInputProps("username")}
					/>

					<TextInput
						name={"password"}
						type={"password"}
						required
						label="Password"
						placeholder="SecretPassword123"
						size={"lg"}
						{...form.getInputProps("password")}
					/>

					<Group position="center" mt="md" mb={"lg"}>
						<Button type="submit" size={"md"} color={"green"}>
							Login
						</Button>
					</Group>

					<Group>
						<Text size={"lg"}>Don&apos;t have an account?</Text>
						<Button
							size={"sm"}
							radius={"lg"}
							variant={"outline"}
							onClick={() => router.push("/register")}
						>
							Register
						</Button>
					</Group>
				</form>
			</Paper>
		</>
	);
};

export default LoginForm;
