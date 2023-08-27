const GET_ALL_ALBUMS = "albums/GET_ALL";

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

// thunk
export const thunkGetAllAlbums = (userId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${userId}`);
    if (res.ok) {
        const albums = await res.json();
        dispatch(getAllAlbums(albums));
        return albums;
    }
}


// reducer
const initialState = {allAlbums: {}, singleAlbum: {}, currentUserAlbums: {}};

export default function albumsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALL_ALBUMS:{
            let newObj = {}
            console.log('in reducer', action.albums.albums);
            action.albums.albums.forEach(album => {
                newObj[album.id] = album
            });
            newState = {...state, allAlbums:{...newObj}}
            return newState
        }
        default:
            return state
    }
}
