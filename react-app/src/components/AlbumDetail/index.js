import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkOneAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
import { NavLink } from 'react-router-dom'
// import { fetchUser } from '../../store/users'
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

    if (!Object.values(album).length || !Object.values(allPhotos).length) return null

    const res  = (allPhotos, userId) => {
        return Object.values(allPhotos).filter(photo => photo.userId == userId)
    }
    // console.log('res', res(allPhotos, userId));

    // const sortPhotoList = (res) => {
        // return Object.values(res).sort((a, b) => {
        //     const latest = new Date(a.createdAt)
        //     const earliest = new Date(b.createdAt)
        //     if (earliest.getTime() > latest.getTime()) return -1
        //     if (latest.getTime() > earliest.getTime()) return 1
        //     return 0
        // })
    // }
    // console.log('photo list', sortPhotoList(res));

    // const photoUrls = (allPhotos) => {
    //     console.log('photo list', sortPhotoList(allPhotos));
    //     for (let photo of sortPhotoList(allPhotos)) {
    //       if (photo.previewImg === true) {
    //           return url
    //       }
    //     }
    //   }
      const previewUrl = []

      for (let photo of res(allPhotos, userId)) {
        if (photo.previewImg === true) {
            previewUrl.push(photo.url)
        }
      }

      const backgorundImageStyle = (photoUrl) => {
        return {
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    return (
        <div>
            <div className='back-to-albums'>
                <NavLink to={`/users/${userId}/albums`}>

                    Back to albums list
                </NavLink>
            </div>
            <div className='album-detail-container' style={backgorundImageStyle(previewUrl[0])}>
                <div>{album.title}</div>
                <div>{album.description}</div>
                <div>{res(allPhotos, userId).length}</div>
                <div>{album.user.firstName} {album.user.lastName}</div>
            </div>
            <div className='photos-container'>
                {res(allPhotos, userId).sort((a, b) => {
                const latest = new Date(a.createdAt)
                const earliest = new Date(b.createdAt)
                if (earliest.getTime() > latest.getTime()) return -1
                if (latest.getTime() > earliest.getTime()) return 1
                return 0
                }).map(photo => <div key={photo.id}><img src={photo.url} />
                </div>)}
            </div>
        </div>
    )
}
