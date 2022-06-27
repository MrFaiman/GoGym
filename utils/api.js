import axios from "axios";

const API_URL = "/api";

const register = (username, password) => {
	return axios.post(
		`${API_URL}/auth/register`,
		{
			username,
			password,
		},
		{
			withCredentials: true,
		}
	);
};

const login = (username, password) => {
	return axios.post(
		`${API_URL}/auth/login`,
		{
			username,
			password,
		},
		{
			withCredentials: true,
		}
	);
};

const auth = () => {
	return axios.get(`${API_URL}/auth`, {
		withCredentials: true,
	});
};

const saveWorkoutSettings = (workoutSettings) => {
	return axios.post(`${API_URL}/workout/settings`, workoutSettings, {
		withCredentials: true,
	});
};

const createWorkout = (date) => {
	return axios.post(
		`${API_URL}/workout/create`,
		{
			date,
		},
		{
			withCredentials: true,
		}
	);
};

const getWorkouts = () => {
	return axios.get(`${API_URL}/workout`);
};

const joinToWorkout = (workoutId, workoutData) => {
	return axios.post(
		`${API_URL}/workout/join`,
		{
			workoutId,
			workoutData,
		},
		{
			withCredentials: true,
		}
	);
};

const leaveWorkout = (workoutId) => {
	return axios.post(
		`${API_URL}/workout/leave`,
		{
			workoutId,
		},
		{
			withCredentials: true,
		}
	);
};

const logout = () => {
	return axios.get(
		`${API_URL}/auth/logout`,
		{},
		{
			withCredentials: true,
		}
	);
};

export default {
	saveWorkoutSettings,
	register,
	login,
	auth,
	API_URL,
	createWorkout,
	getWorkouts,
	joinToWorkout,
	logout,
	leaveWorkout,
};
