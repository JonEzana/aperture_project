const GET_ALL_PHOTOS = "photos/GET_ALL";
const GET_SINGLE_PHOTO = "photos/getSinglePhoto";
const GET_CURRENT_USER_PHOTOS = "photos/getCurrentUserPhotos";
const DELETE_PHOTO = "photos/DELETE_PHOTO";
const CREATE_PHOTO = "photos/createPhoto";
const UPDATE_PHOTO = "photos/updatePhoto";

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

const getSinglePhoto = (photo) => ({
    type: GET_SINGLE_PHOTO,
    payload: photo
});

const getCurrentUserPhotos = (photos) => ({
    type: GET_CURRENT_USER_PHOTOS,
    payload: photos
})

const deletePhoto = (photoId) => ({
    type: DELETE_PHOTO,
    payload: photoId
});

const createPhoto = (photo) => ({
    type: CREATE_PHOTO,
    payload: photo
});

const updatePhoto = (photo) => ({
    type: UPDATE_PHOTO,
    payload: photo
})

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

export const thunkGetCurrentUserPhotos = (UserId) => async (dispatch) => {
    const res = await fetch('/api/photos/all');
    if (res.ok) {
        const photoData = await res.json();
        const filteredPhotos = photoData.photos.filter(photo => photo.userId == UserId);
        dispatch(getCurrentUserPhotos(filteredPhotos));
        return filteredPhotos;
    }
}

export const thunkDeletePhoto = (photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/delete/${photoId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        await dispatch(deletePhoto(photoId))
    }
}

export const thunkCreatePhoto = (photoData) => async (dispatch) => {
    const { title, url, description, user_id } = photoData;
    const res = await fetch('/api/photos/new', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            url,
            description,
            user_id
        })
    })

    if (res.ok) {
        const photo = await res.json();
        dispatch(createPhoto(photo));
        return photo;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkUpdatePhoto = (photoData) => async (dispatch) => {
    const res = await fetch(`/api/photos/${photoData.photoId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoData)
    });
    if (res.ok) {
        const updatedPhoto = await res.json();
        dispatch(updatePhoto(updatedPhoto));
        return updatedPhoto;
    } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}

}
export const thunkUpdatePhotoList = (photoData, albumId) => async (dispatch) => {

    const req = photoData.map(photo => {
        photo['album_id'] = albumId
        return fetch(`/api/photos/edit/${photo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(photo)
        }).then(res => res.json()).catch(e => {
            throw e
        })
    })


    Promise.allSettled(req).then(res => {
        if (res.status === 'fulfilled') {
            dispatch(updatePhoto(res))
        }
    }).catch(e => {
        throw e
    })

}

const initialState = { allPhotos: {}, singlePhoto: {}, currentUserPhotos: {} };

export default function photosReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS: {
            const newState = { allPhotos: { ...state.allPhotos }, singlePhoto: {}, currentUserPhotos: {} };
            action.payload.photos.forEach(photo => {
                newState.allPhotos[photo.id] = photo;
            });
            return newState;
        }
        case GET_SINGLE_PHOTO: {
            return { ...state, allPhotos: { ...state.allPhotos }, singlePhoto: { ...action.payload }, currentUserPhotos: {} }
        }
        case GET_CURRENT_USER_PHOTOS: {
            const newState = { ...state, allPhotos: { ...state.allPhotos }, currentUserPhotos: { ...state.currentUserPhotos } };
            action.payload.forEach(photo => {
                newState.currentUserPhotos[photo.id] = photo;
            });
            return newState;
        }
        case DELETE_PHOTO: {
            const newState = { ...state, allPhotos: { ...state.allPhotos }, singlePhoto: { ...state.singlePhoto }, currentUserPhotos: { ...state.currentUserPhotos } }
            delete newState.allPhotos[action.payload]
            delete newState.currentUserPhotos[action.payload]
            delete newState.singlePhoto;
            return { ...newState, allPhotos: { ...newState.allPhotos }, currentUserPhotos: { ...newState.currentUserPhotos }, singlePhoto: { ...newState.singlePhoto } };
        }
        case CREATE_PHOTO: {
            return {
                ...state,
                allPhotos: { ...state.allPhotos, [action.payload.id]: action.payload },
                currentUserPhotos: { ...state.currentUserPhotos, [action.payload.id]: action.payload },
                singlePhoto: action.payload
            }
        }
        case UPDATE_PHOTO: {
            return {
                ...state,
                allPhotos: { ...state.allPhotos, [action.payload.id]: { ...action.payload } },
                currentUserPhotos: { ...state.currentUserPhotos, [action.payload.id]: { ...action.payload } },
                singlePhoto: { ...action.payload }
            }
        }
        default:
            return state;
    }
}
