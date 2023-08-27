const GET_ALL_USERS = "users/getAllUsers";

export const getAllUsers = (users) => ({
    type: GET_ALL_USERS,
    payload: users
});

export const thunkGetAllUsers = () => async (dispatch) => {
    const res  = await fetch('/api/users/');
    if (res.ok) {
        const users = await res.json();
        dispatch(getAllUsers(users.users));
        return users;
    }
}

const initialState = {allUsers: {}, singleUser: {}};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: {
            console.log('USERS THUNK...', action.payload)
            const newState = {...state, allUsers: {...state.allUsers}, singleUsers: {}};
            action.payload.forEach(user => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        }
        default:
            return state;
    }
}
