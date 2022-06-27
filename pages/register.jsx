import { RegisterForm } from "components";

const Register = () => {
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
			<RegisterForm />
		</div>
	);
};

export default Register;
