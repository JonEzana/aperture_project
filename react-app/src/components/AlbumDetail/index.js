import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkOneAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
import { fetchUser } from '../../store/users'
import './AlbumDetail.css'
import { useParams } from "react-router-dom";

export default function AlbumDetail() {
    const dispatch = useDispatch();
    const {userId, albumId} = useParams()
    const album = useSelector(state => state.albums.singleAlbum)
    // const user = useSelector(state => state.users.singleUser)
    const allPhotos = useSelector(state => state.photos.allPhotos)


    useEffect(() => {
        dispatch(thunkGetAllPhotos())
        dispatch(thunkOneAlbum(userId, albumId))
    }, [])

    if (!album || !allPhotos) return null

    const detailPhotos = (allPhotos, userId) => {
        return Object.values(allPhotos).filter(photo => photo.userId === userId)
    }

    return (
        <div>
            <div className='album-detail-container'>
                <div>{album.title}</div>
                <div>{album.description}</div>
                <div>{detailPhotos(allPhotos, userId).length}</div>
                <div>{album.user.first_name} {album.user.last_name}</div>
            </div>
            <div className='photos-container'>
                {detailPhotos(allPhotos, userId).map(photo => <div key={photo.id}>{photo.url}</div>)}
            </div>
        </div>
    )
}
