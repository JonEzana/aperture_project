import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import './AlbumsIndex.css'
import ProfileHeader from '../ProfileHeader'
import ProfileNav from '../ProfileNav'
import { useParams, useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { useBackgroundImgContext } from '../../context/BackgroundImage'
import OpenModalButton from '../OpenModalButton'
import { DeleteAlbum } from '../DeleteAlbumModal'
export default function AllAlbums({ backgroundUrl }) {
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums.allAlbums))
    const { userId } = useParams()
    const { backgroundImg } = useBackgroundImgContext()
  
    
    useEffect(() => {
        dispatch(thunkGetAllAlbums(userId))
    }, [])

    const userAlbum = albums.filter(album => album.userId == userId)
    const routetoEdit = (e, albumId) => {
        e.stopPropagation()
        history.push('/albums/new', { type: 'edit', albumId })
    }
    const photoUrl = (album) => {
        if (album.photos) {
            for (let photo of album.photos) {
                if (photo.previewImg === true) {
                    return `url(${photo.url})`
                }
            }
        
            return album.photos[0] ? `url(${album.photos[0]?.url})` : `url(${backgroundImg})`
        }
        return `url(${backgroundImg})`
    }

    const backgroundImageStyle = (album) => {
        return {
            backgroundImage: photoUrl(album),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    const sortAlbumList = (albums) => {
        return albums.sort((a, b) => {
            const latest = new Date(a.createdAt)
            const earliest = new Date(b.createdAt)
            if (earliest.getTime() > latest.getTime()) return -1
            if (latest.getTime() > earliest.getTime()) return 1
            return 0
        })
    }

    const detailsAlbum = (userId, albumId) => {
        history.push(`/users/${userId}/albums/${albumId}`)
    }
    
    
    return (
        <div>
            <ProfileHeader userId={userId} url={backgroundUrl} />
            <ProfileNav userId={userId} />

            {currentUser && <div id='create-new-album'><NavLink to={`/albums/new`}>New album</NavLink></div>}
            <div className='albums-container'>
                {sortAlbumList(userAlbum).map(album => <div onClick={() => detailsAlbum(album.userId, album.id)} className='album' style={backgroundImageStyle(album)} key={album.id}>
                    <div className='title-photo-container'>
                        <div>
                            <div>{album.title}</div>
                            <div>{album.photos?.length == 1 || album.photos?.length === 0 ? `${album.photos?.length} photo` : `${album.photos?.length} photos`} </div>
                        </div>{
                            currentUser.id == userId ? <div className='Edit-Delete-Album'> 
                            <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id)}>
                                Edit
                            </div>
                            <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id)}>
                                <OpenModalButton modalComponent={<DeleteAlbum album={album} />} buttonText={'Delete'} />
                            </div>
                            </div> 
                            :
                             <div id='album-arrow-icon' onClick={e => routetoEdit(e, album.id)}>
                              <i className="fas fa-share"></i>
                         </div>
                            }
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}
