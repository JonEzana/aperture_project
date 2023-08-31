import { useHistory } from "react-router-dom"
import { thunkCreateFav } from "../../store/fav"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { thunkGetAllPhotos } from "../../store/photos"


export const UserBlurb = ({url, username, styles, userId, photoId,  currentUser, userFavpic, count}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const fillStars = userFavpic.filter(photo=>photo.id == photoId)
    const [fav, setFav] = useState(fillStars.length ? true : false)
    const handleClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${userId}/photos`)
    }
    const handleSubmit = (e, userId, photoId) => {
        e.stopPropagation()
        setFav(!fav)
        dispatch(thunkCreateFav(userId, photoId)).then(() => dispatch(thunkGetAllPhotos()))
    }

    return (
        <div className="user-blurb-container" style={styles}>
            <span onClick={e=>handleClick(e)} className="user-blurb-left" style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                <img src={url} className="circle-prof-pic" style={{height: "40px", width: "40px", borderRadius: "25px"}}></img>
                <p className="user-name">{username}</p>
            </span>
            <span className="user-blurb-right">
                <i className={fav ? "fas fa-star" : "far fa-star"} onClick={e => handleSubmit(e, currentUser.id, photoId)} style={{color: "#FFD700", paddingRight: "10px"}}></i> {count}
            </span>

        </div>
    )
}
