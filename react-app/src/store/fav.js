const ALL_FAV = 'fav/ALL_FAV'
const CREATE_FAV = 'fav/CREATE_FAV'

const getAllFav = (favorites)  => ({
    type: ALL_FAV,
    favorites
})

const newFav = (favorites) => ({
    type: CREATE_FAV,
    favorites
})

export const thunkAllFav = (userId) => async (dispatch) => {
    const res = await fetch(`/api/fav/${userId}/allFav`)

    if (res.ok) {
        const fav = await res.json();
        dispatch(getAllFav(fav));
    }
}

export const thunkCreateFav = (userId, photoId) => async (dispatch) => {
    const res = await fetch(`/api/fav/${userId}/${photoId}/new`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: userId,
            photo_id : photoId,
        })
    })

    if (res.ok) {
        const favPhoto = await res.json();
        dispatch(newFav(favPhoto));
    }
}

const initialState = {allFav: {}}
export default function favReducer(state = initialState, action) {
    switch(action.type) {
        case ALL_FAV: {
            const newState = {...state, allFav: {...state.allFav}}
            action.favorites.favPhotos.forEach(fav => {
                newState.allFav[fav.id] = fav;
            })
            return newState
        }
        case CREATE_FAV: {

            const newState = {...state, allFav: {...state.allFav}}
            return {...newState, allFav: {...newState.allFav, ...action.favorites.allFav}}
        }
        default:
            return state
    }
}
