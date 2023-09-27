// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {

		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		// headers: {
		// 	"Accept": "application/json",
		// 	"Content-Type": "multipart/form-data"
		// },
		body: formData
	});

	if (response.ok) {
		console.log('82', response)
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		console.log('87', response)
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		console.log('93')
		return ["An error occurred. Please try again."];
	}
};

export const signUpNoFile = (data) => async (dispatch) => {
	const {email, firstName, lastName, profilePic, password, bio, username} = data;
	const response = await fetch("/api/auth/signup-new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email,
			last_name: lastName,
			username: username,
			first_name: firstName,
			profile_pic: profilePic,
			password,
			bio
		})
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
