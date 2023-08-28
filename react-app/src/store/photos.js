const GET_ALL_PHOTOS = "photos/GET_ALL";
const GET_SINGLE_PHOTO = "photos/getSinglePhoto";
const DELETE_PHOTO = "photos/DELETE_PHOTO"

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

const getSinglePhoto = (photo) => ({
    type: GET_SINGLE_PHOTO,
    payload: photo
});

const deletePhoto = (photoId) => ({
    type: DELETE_PHOTO,
    payload: photoId
});

export const thunkGetAllPhotos = () => async (dispatch) => {
    const res = await fetch('/api/photos/all');
    if (res.ok) {
        const photos = await res.json();
        dispatch(getAllPhotos(photos));
        return photos;
    }
};

export const thunkGetSinglePhoto = (id) => async (dispatch) => {
    const res = await fetch(`/api/photos/${id}`);
    if (res.ok) {
        const photo = await res.json();
        dispatch(getSinglePhoto(photo));
        return photo;
    } else {
        return "u thought";
    }
};

export const thunkDeletePhoto = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/delete/${photoId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        await dispatch(deletePhoto(photoId))
    }
}


const initialState = {allPhotos: {}, singlePhoto: {}, currentUserPhotos: {}};

export default function photosReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_PHOTOS: {
            const newState = { allPhotos: {...state.allPhotos}, singlePhoto: {}, currentUserPhotos: {}};
            action.payload.photos.forEach(photo => {
                newState.allPhotos[photo.id] = photo;
            });
            return newState;
        }
        case GET_SINGLE_PHOTO: {
            return {...state, allPhotos: {...state.allPhotos}, singlePhoto: {...action.payload}, currentUserPhotos: {}}
        }
        case DELETE_PHOTO: {
            const newState = {...state, allPhotos: {...state.allPhotos}, currentUserPhotos: {...state.currentUserPhotos}}
            delete newState.allPhotos[action.photoId]
            delete newState.currentUserPhotos[action.photoId]
            return newState;
        }
        default:
            return state;
    }
}
