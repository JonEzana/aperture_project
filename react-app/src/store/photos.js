const GET_ALL_PHOTOS = "photos/GET_ALL";

const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

export const thunkGetAllPhotos = () =>
