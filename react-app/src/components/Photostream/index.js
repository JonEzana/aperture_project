import {useEffect} from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { fetchUser } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader";
import ProfileNav from "../ProfileNav";
import './Photostream.css'

export const Photostream = ({backgroundUrl}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();
    const allPhotos = useSelector(state => state.photos.allPhotos);
    const user = useSelector(state => state.users.singleUser);

    useEffect(() => {
        dispatch(thunkGetAllPhotos());
        dispatch(fetchUser(userId))
    }, [dispatch]);

    const photos = Object.values(allPhotos).filter(photo => photo?.userId === user.id);

    return (
        <div>
            <ProfileHeader userId={user.id} url={backgroundUrl} />
            <ProfileNav userId={user.id}/>
            <div id='user-photos-container-container'>
                <div id='user-photos-container'>
                    {photos.map(photo =>
                        // <span className='all-photos-card' title={photo.name} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id}>
                            <img className='user-photos-pic' src={photo.url} alt={photo.title} style={{}}></img>
                        // </span>
                    )}
                </div>
            </div>
        </div>
    )
}
