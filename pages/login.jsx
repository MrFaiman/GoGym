import { LoginForm } from "components";

const Login = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<LoginForm />
		</div>
	);
};

export default Login;
