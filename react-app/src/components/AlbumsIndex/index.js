import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {thunkGetAllAlbums} from '../../store/albums'
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

    function helper(album){
        for (let photo of album.photos) {
            if (photo.previewImg === true) {
                return photo.url
            }
        }
    }
    // console.log('preview photo', previewPhoto);

    return (
        <div>
            <div className='albums-container'>
                {albums.map(album => <div className='album' key={album.id}>
                    <div className='img' style = {{ backgroundImage: `url('helper(album)')` }}>
                        <div>{album.title}</div>
                        <div>
                            {helper(album)}
                        </div>
                        <div>{album.photos.length} photos</div>
                    </div>
                </div>
                )}

            </div>
        </div>
    )
}
