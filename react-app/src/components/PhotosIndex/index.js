import {useEffect} from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { thunkGetAllUsers } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {UserBlurb} from '../UserBlurb';
import './PhotosIndex.css';

export const PhotosIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const fotos = useSelector(state => state.photos.allPhotos);
    const users = useSelector(state => state.users.allUsers);

    useEffect(() => {
        dispatch(thunkGetAllPhotos());
        dispatch(thunkGetAllUsers());
    }, [dispatch])

    const photos = [...Object.values(fotos)];

    const userArr = [...Object.values(users)];

    photos.forEach(photo => {
        photo["Owner"] = userArr.find(user => user.id === photo.userId)
    });

    return (
        <div className='container-container'>
            <div className='all-photos-container'>
                {photos.map(photo =>
                    <span className='all-photos-card' title={photo.name} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id}>
                        <img className='all-photos-pic' src={photo.url} alt={photo.title} style={{borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}}></img>
                        <UserBlurb
                            url={photo?.Owner?.profilePic}
                            username={photo?.Owner?.username}
                            styles={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "4px", paddingLeft: "4px", alignItems: "center"}}
                        />
                    </span>
                )}
            </div>
        </div>
    )
}
