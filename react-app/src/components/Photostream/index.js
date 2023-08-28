import {useEffect} from "react";
import { thunkGetAllPhotos } from "../../store/photos";
import { fetchUser } from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProfileHeader from "../ProfileHeader";
import ProfileNav from "../ProfileNav";

export const Photostream = () => {
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
            <ProfileHeader userId={user.id} url={"https://e1.pxfuel.com/desktop-wallpaper/532/607/desktop-wallpaper-pinterest-thebabester-aesthetic-purple-wide.jpg"}/>
            <ProfileNav userId={user.id}/>
            <div className='container-container'>
                <div className='all-photos-container'>
                    {photos.map(photo =>
                        <span className='all-photos-card' title={photo.name} onClick={() => history.push(`/photos/${photo.id}`)} key={photo.id}>
                            <img className='all-photos-pic' src={photo.url} alt={photo.title} style={{borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}}></img>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
