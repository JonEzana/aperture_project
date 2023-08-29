import React, {useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeletePhotoModalFunction from "../DeletePhotoModal";
import { PhotoFormModalFunction } from "../PhotoFormModalFunction";

export default function PhotoHoverComponent({photo, isCurrentUserOnOwnPage, userid}) {
    const [photoInfoBox, setPhotoInfoBox] = useState(false)
    const ref = useRef()

    const urlToString = url => {
        return `url(${url})`
    }

    const backgroundImageStyle = (url) => {
        return {
            backgroundImage: urlToString(url),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "300px"
        }
    }

    const displayName = (photo) => {
        if (isCurrentUserOnOwnPage) {
            return "YOU!"
        } return photo.Owner.username;
    }
    // console.log('hover component', photo.url)
    // console.log('hover component', isCurrentUserOnOwnPage)

    return (

            <div style={backgroundImageStyle(photo.url)} className="photo-detail-container" ref={ref} onMouseEnter={() => setPhotoInfoBox(true)} onMouseLeave={() => setPhotoInfoBox(false)} key={photo.id}>
                {photoInfoBox &&
                    <div className="text">
                        <div className="title-name-icons" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                            <div className="title-and-name" style={{border: "2px solid red"}}>
                                <div>{photo.title}</div>
                                <div style={{fontSize: "11px"}}>by {displayName(photo)}</div>
                            </div>
                            { isCurrentUserOnOwnPage &&
                                <div className="owner-icons" style={{display: "flex", gap:"6px"}}>
                                    <OpenModalButton
                                        modalComponent={<PhotoFormModalFunction photo={photo} formType={'Update'}/>}
                                        buttonText={<i className="fas fa-edit" style={{color: "#ababab"}}></i>}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                    />                                    
                                    <OpenModalButton
                                        modalComponent={<DeletePhotoModalFunction photoId={photo.id} userid={userid}/>}
                                        buttonText={<i className="fas fa-trash-alt" style={{color: "#ababab"}}></i>}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                    />
                                </div>
                            }
                            { !isCurrentUserOnOwnPage &&
                                <div className="not-owner-icons">
                                    <i className="far fa-star" style={{color: "#FFD700"}}></i>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
    )
}
