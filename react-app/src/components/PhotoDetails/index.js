import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetAllUsers } from "../../store/users";
import { thunkGetSinglePhoto } from "../../store/photos";
import { UserBlurb } from "../UserBlurb";

export const PhotoDetails = () => {
    const dispatch = useDispatch();
    const {photoId} = useParams();
    const users = useSelector(state => state.users.allUsers);
    let photo = useSelector(state => state.photos.singlePhoto);

    useEffect(() => {
        dispatch(thunkGetSinglePhoto(photoId));
        dispatch(thunkGetAllUsers())
    }, [dispatch]);

    photo["Owner"] = Object.values(users).find(user => user.id === photo.userId);

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <img src={photo?.url} alt={photo?.title} style={{margin: "0", border: "1px solid red"}}></img>
            <span style={{display: "flex", flexDirection: "row", gap: "17px", alignItems: "center"}}>
                <img src={photo?.Owner?.profilePic} style={{height: "75px", borderRadius: "60px", justifySelf: "center"}}></img>
                <span style={{display: "flex", flexDirection: "column"}}>
                    <h2 style={{border: "1px red solid", fontWeight: "bold"}}>{photo?.Owner?.username}</h2>
                    <h4 style={{border: "1px red solid"}}>{photo?.description}</h4>
                </span>
            </span>
            <div>
                comments go here
            </div>
            <span>
                <form>
                    <textarea placeholder="Leave your comment here!"></textarea>
                </form>
                    <input type="submit" style={{width: "90px"}}></input>
            </span>
        </div>
    )
}
