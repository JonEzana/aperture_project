import {useEffect} from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './PhotosIndex.css';

export const PhotosIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fotos = useSelector(state => {
        return state.photos.allPhotos
    }); 
    
    useEffect(() => {
        dispatch(thunkGetAllPhotos());
    }, [dispatch])
    
    const photos = [...Object.values(fotos)];

    // key attribute?

    return (
        <div className='container-container'>
            <div className='all-photos-container'>
                {photos.map(photo =>
                    // {if photo.user_id === }
                    <span className='all-photos-card' title={photo.name} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id}>
                        <img className='all-photos-pic' src={photo.url} alt={photo.title}></img>
                        <div className='bottom-half'>
                            <span>

                            </span>
                        </div>
                    </span>
                )}
            </div>
        </div>
    )
}
