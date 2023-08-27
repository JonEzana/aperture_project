export const UserBlurb = ({url, username, styles}) => {

    return (
        <div className="user-blurb-container" style={styles}>
            <span className="user-blurb-left" style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center"}}>
                <img src={url} className="circle-prof-pic" style={{height: "40px", width: "40px", borderRadius: "25px"}}></img>
                <p className="user-name">{username}</p>
            </span>
            <span className="user-blurb-right">
                <i className="far fa-heart" style={{color: "#707070", paddingRight: "10px"}}></i>
            </span>
        </div>
    )
}
