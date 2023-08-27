const GET_USER = 'api/user/GET_USER';


const getUser = (user) => ({
    type: GET_USER,
    user
})

// thunk
export const fetchUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

    if (res.ok){
        const data = await res.json();
        dispatch(getUser(data));
    } else {
        return ["An error occurred. Please try again."]
    }
}


// reducer
const initialState = {user: {}}
export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {...state, user: {...action.user}}
        default:
            return state;
    }
}
