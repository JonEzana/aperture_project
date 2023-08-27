import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import './AlbumsIndex.css'

export default function AllAlbums() {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums.allAlbums))


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

    const backgorundImageStyle = (album) => {
        return {
            backgroundImage: photoUrl(album),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    return (
        <div>
            <div className='albums-container'>
                {albums.map(album => <div className='album' style={backgorundImageStyle(album)} key={album.id}>
                    <div className='title-photo-container'>
                        <div>
                            <div>{album.title}</div>
                            <div>{album.photos.length} photos</div>
                        </div>
                        <div id='album-arrow-icon'>
                            <i className="fa-solid fa-share"></i>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}
