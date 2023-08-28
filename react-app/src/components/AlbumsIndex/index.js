import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import './AlbumsIndex.css'
import ProfileHeader from '../ProfileHeader'
import ProfileNav from '../ProfileNav'
import { useParams, useHistory } from "react-router-dom";

export default function AllAlbums() {
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums.allAlbums))
    const {userId} = useParams()
    // console.log('user id', userId);

    useEffect(() => {
        dispatch(thunkGetAllAlbums(currentUser.id))
    }, [])

    if (!albums.length) return null

    // const res = albums.find(album => album.photos.find(photo => photo.previewImg === true))
    // console.log('res', res);

    const photoUrl = (album) => {
        for (let photo of album.photos) {
            if (photo.previewImg === true) {
                return `url(${photo.url})`
            }
        }
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

    const earliestAlbumUrl = (albums) => {
      for (let photo of sortAlbumList(albums)[0].photos) {
        if (photo.previewImg === true) {
            return photo.url
        }
      }
    }

    const detailsAlbum = (userId, albumId) => {
        history.push(`/users/${userId}/albums/${albumId}`)
    }

    return (
        <div>
            <ProfileHeader userId={userId} url={earliestAlbumUrl(albums)}/>
            <ProfileNav userId={userId} />
            <div className='albums-container'>
                {sortAlbumList(albums).map(album => <div onClick={() => detailsAlbum(album.userId, album.id)} className='album' style={backgroundImageStyle(album)} key={album.id}>
                    <div className='title-photo-container'>
                        <div>
                            <div>{album.title}</div>
                            <div>{album.photos.length} photos</div>
                        </div>
                        <div id='album-arrow-icon'>
                            <i className="fas fa-share"></i>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}
