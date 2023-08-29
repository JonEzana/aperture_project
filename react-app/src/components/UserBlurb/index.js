import { useHistory } from "react-router-dom"

export const UserBlurb = ({url, username, styles, userId}) => {
    const history = useHistory()
    const handleClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${userId}/photos`) 
    }

    return (
        <div className="user-blurb-container" style={styles}>
            <span onClick={e=>handleClick(e)} className="user-blurb-left" style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                <img src={url} className="circle-prof-pic" style={{height: "40px", width: "40px", borderRadius: "25px"}}></img>
                <p className="user-name">{username}</p>
            </span>
            <span className="user-blurb-right">
                <i className="far fa-star" style={{color: "#FFD700", paddingRight: "10px"}}></i>
            </span>
        </div>
    )
}
