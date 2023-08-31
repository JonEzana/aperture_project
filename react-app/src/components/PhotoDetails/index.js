import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllUsers } from "../../store/users";
import { thunkGetSinglePhoto } from "../../store/photos";
import { UserBlurb } from "../UserBlurb";
import * as sessionActions from "../../store/comments";
import GetAllCommentsByPhotoIdFunction from "../GetAllComments";
import { CreateComments } from "../CreateComments";
import { thunkCreateFav } from "../../store/fav";
import './PhotoDetails.css';


export const PhotoDetails = () => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const users = Object.values(useSelector(state => state.users.allUsers));
    const currentUser = useSelector(state => state.session.user);
    const photo = useSelector(state => state.photos.singlePhoto);
    const comments = Object.values(useSelector(state => state.comments.photoComments)).filter(comment => comment.photoId == photoId);

    useEffect(() => {
        dispatch(thunkGetSinglePhoto(photoId));
        dispatch(thunkGetAllUsers());
        dispatch(sessionActions.thunkGetAllCommentsByPhotoId(photoId));
    }, [dispatch]);

    const handleSubmit = (userId, photoId) => {
        console.log(userId);
        console.log(photoId);
        dispatch(thunkCreateFav(userId, photoId))
    }

    photo["Owner"] = Object.values(users).find(user => user.id === photo.userId);

    console.log('PhotoDetails Line 35, comments: ', comments)

    return (
        <div id='outer-detail-div'>
            <div id='gray-div'>
                <img src={photo?.url} alt={photo?.title} id='detail-pic'></img>
            </div>
            <div id='detail-bottom-outer'>
            <div id='detail-bottom'>
                <span id='detail-user-stuff'>
                    <img src={photo?.Owner?.profilePic} id='detail-profile-pic'></img>
                    <span id='user-text'>
                        <h2 id='username-h2'>{photo?.Owner?.username}</h2>
                        <h4 id='user-description-h4'>{photo?.description}</h4>
                    </span>
                </span>
                <span id='detail-like-action'>
                    <p style={{margin: '0px', paddingTop: '20px'}}>Favorite <i className="far fa-star" onClick={handleSubmit(currentUser.id, photoId)}></i></p>
                </span>
            </div>
            <div id='comments-container'>
                <CreateComments />
                {Object.values(comments).length ? comments.toReversed().map(comment =>              
                // {comments.toReversed().map(comment =>
                    <GetAllCommentsByPhotoIdFunction comment={comment} currentUser={currentUser} photoId={photo.id}/>
                // )}
                ):<p>rando</p>}             
            </div>
            <span>
            </span>
            </div>
        </div>
    )
}
