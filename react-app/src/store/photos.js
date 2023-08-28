const GET_ALL_PHOTOS = "photos/GET_ALL";
const GET_SINGLE_PHOTO = "photos/getSinglePhoto";

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

const getSinglePhoto = (photo) => ({
    type: GET_SINGLE_PHOTO,
    payload: photo
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
        default:
            return state;
    }
}
