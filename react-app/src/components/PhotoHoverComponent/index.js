import React, {useRef, useState} from "react";
// import './AlbumDetail.css'

export default function PhotoHoverComponent({photo, isCurrentUserOnOwnPage}) {
    const [photoInfoBox, setPhotoInfoBox] = useState(false)
    const ref = useRef()

    const urlToString = url => {
        return `url(${url})`
    }

    const individualImageStyle = (url) => {
        return {
            backgroundImage: urlToString(url),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    const displayName = (photo) => {
        if (isCurrentUserOnOwnPage) {
            return "YOU!"
        } return photo.Owner.username;
    }
    console.log('hover component', photo.url)
    console.log('hover component', isCurrentUserOnOwnPage)
    // console.log('hover component', photo)
    return (
        <div>
            <div style={individualImageStyle(photo.url)} className="photo-detail-container" ref={ref} onMouseEnter={() => setPhotoInfoBox(true)} onMouseLeave={() => setPhotoInfoBox(false)} key={photo.id}>
                {!photoInfoBox && <div className="text">

                    <div className="title-and-name">
                        <div>{photo.title}</div>
                        <div>by {displayName(photo)}</div>
                    </div>

                    { isCurrentUserOnOwnPage && <p>OWNER</p> }
                    { !isCurrentUserOnOwnPage && <p>NOT OWNER</p> }
                </div>}
            </div>
        </div>
    )
}
