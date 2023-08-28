import {useEffect} from "react";
import { thunkGetCurrentUserPhotos } from "../../store/photos";
import { thunkGetAllUsers } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader";
import ProfileNav from "../ProfileNav";
import PhotoHoverComponent from "../PhotoHoverComponent";
import './Photostream.css'

export const Photostream = ({backgroundUrl}) => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const photos = Object.values(useSelector(state => state.photos.currentUserPhotos));
    const currentUser = useSelector(state => state.session.user);
    const allUsers = Object.values(useSelector(state => state.users.allUsers));

    useEffect(() => {
        dispatch(thunkGetCurrentUserPhotos(userId));
        dispatch(thunkGetAllUsers());
    }, [dispatch]);

    photos.forEach(photo => {
        photo["Owner"] = Object.values(allUsers).find(user => user.id === photo.userId);
    });

    const currentUserOnOwnPage = () => {
        if (currentUser.id == userId) return true;
        return false;
    }

    if (!photos.length) return <></>;

    return (
        <div>
            <ProfileHeader userId={currentUser.id} url={backgroundUrl} />
            <ProfileNav userId={currentUser.id}/>
            <div id='user-photos-container-container'>
                <div id='user-photos-container'>
                    {photos.map(photo =>
                        // <span className='all-photos-card' title={photo.name} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id}>
                        <div key={photo.id}>
                            <PhotoHoverComponent isCurrentUserOnOwnPage={currentUserOnOwnPage()} photo={photo}/>
                        </div>
                        //     <img className='user-photos-pic' src={photo.url} alt={photo.title} style={{}}></img>
                        //  </span>
                    )}
                </div>
            </div>
        </div>
    )
}
