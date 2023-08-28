const GET_ALL_ALBUMS = "albums/GET_ALL";
const GET_ONE_ALBUM = "album/GET_ONE_ALBUM";

const getAllAlbums = (albums) => ({
    type: GET_ALL_ALBUMS,
    albums
})

const getOneAlbum = (album) => ({
    type: GET_ONE_ALBUM,
    album
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

export const thunkOneAlbum = (userId, albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${userId}/${albumId}`);
    if (res.ok) {
        const album = await res.json();
        dispatch(getOneAlbum(album))
        return album
    }
}


// reducer
const initialState = {allAlbums: {}, singleAlbum: {}, currentUserAlbums: {}};

export default function albumsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALL_ALBUMS:{
            let newObj = {}
            action.albums.albums.forEach(album => {
                newObj[album.id] = album
            });
            newState = {...state, allAlbums:{...newObj}}
            return newState
        }
        case GET_ONE_ALBUM: {
            return {...state, singleAlbum: {...action.album}}
        }
        default:
            return state
    }
}
