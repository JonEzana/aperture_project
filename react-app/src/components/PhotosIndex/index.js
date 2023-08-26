import {useEffect} from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const PhotosIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fotos = useSelector(state => {
        console.log('IN THE USESELECTOR....', state)
        return state.photos.allPhotos
    });
    console.log('FOTOS....', fotos)
    useEffect(() => {
        dispatch(thunkGetAllPhotos());
    }, [dispatch])

    // const photos = [];
    // Object.values(fotos).forEach(photo => photos.push(photo));
    const photos = [...Object.values(fotos)];
    console.log('PHOTOS....', photos)

    // const sortedPhotos = photos.sort((a, b) => )

    return (
        <>
            {photos.map(photo =>
                <div className='photos-container' title={`${photo.name}`} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id} alt={photo.title}>
                    <img className="individual-photo-container" src={photo.url}></img>
                </div>
            )}
        </>
    )
}
