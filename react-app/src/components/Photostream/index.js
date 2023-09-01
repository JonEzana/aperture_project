import { useEffect } from "react";
import { thunkGetCurrentUserPhotos } from "../../store/photos";
import { thunkGetAllUsers } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader";
import ProfileNav from "../ProfileNav";
import PhotoHoverComponent from "../PhotoHoverComponent";
import OpenModalButton from '../OpenModalButton';
import './Photostream.css'
import { PhotoFormModalFunction } from '../PhotoFormModalFunction';

export const Photostream = ({ backgroundUrl, fav, like }) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
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

    fav && fav.forEach(photo => {
        photo["Owner"] = Object.values(allUsers).find(user => user.id === photo.userId);
    });

    const currentUserOnOwnPage = () => {
        if (currentUser.id == userId) return true;
        return false;
    }

    if (!like && Object.values(currentUser).length && !photos.length) return (
        <div>
            <ProfileHeader userId={+userId} url={backgroundUrl} />
            <ProfileNav userId={+userId} />
            <div>No photos yet!</div>
        </div>
    );

    return (
        <div>
            <ProfileHeader userId={+userId} url={backgroundUrl} />
            <ProfileNav userId={+userId} />
            <div>
                <OpenModalButton
                    modalComponent={<PhotoFormModalFunction />}
                    buttonText={"Post Your Photo"}
                    style={{ width: "120px", backgroundColor: "transparent", color: "black", border: "none" }}
                    className={"new-spot-link"}
                />
            </div>
            <div id='user-photos-container-container'>
                <div id='user-photos-container'>
                    {
                        like === "like" ? fav?.map(photo =>
                            <div key={photo.id}>
                                <PhotoHoverComponent type={"fav"} isCurrentUserOnOwnPage={currentUserOnOwnPage()} photo={photo} userid={+userId} photoUrl={photo.url} ownerName={photo?.Owner?.username} />
                            </div>
                        )
                            :
                            photos.toReversed().map(photo =>
                                <div key={photo.id}>
                                    <PhotoHoverComponent type={"photoStream"} isCurrentUserOnOwnPage={currentUserOnOwnPage()} photo={photo} userid={+userId} ownerName={photo?.Owner?.username} photoUrl={photo.url} />
                                </div>
                            )}
                </div>
            </div>
        </div>
    )
}
