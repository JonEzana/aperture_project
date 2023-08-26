const GET_ALL_PHOTOS = "photos/GET_ALL";

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

export const thunkGetAllPhotos = () => async (dispatch) => {
    const res = await fetch('/api/photos/all');
    if (res.ok) {
        const photos = await res.json();
        dispatch(getAllPhotos(photos));
        return photos;
    }
}

const initialState = {allPhotos: {}, singlePhoto: {}, currentUserPhotos: {}};

export default function photosReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_PHOTOS: {
            const newState = {...state};
            action.payload.forEach(photo => {
                newState.allPhotos[photo.id] = photo;
            });
            return newState;
        }
    }
}
