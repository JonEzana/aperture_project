import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkOneAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
import { NavLink } from 'react-router-dom'
// import { fetchUser } from '../../store/users'
import './AlbumDetail.css'
import { useParams } from "react-router-dom";
import PhotoContainer from './photoContainer'

export default function AlbumDetail() {
    const dispatch = useDispatch();
    const {userId, albumId} = useParams()
    const album = useSelector(state => state.albums.singleAlbum)
    // const user = useSelector(state => state.users.singleUser)
    const allPhotos = useSelector(state => state.photos.allPhotos)
    // const [albumInfoBox, setAlbumInfoBox] = useState(false)
    // const ref = useRef()
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
        <div className='one-album-container'>
            <div className='back-to-albums'>
                <NavLink to={`/users/${userId}/albums`}>
                    <i className="fas fa-arrow-left"></i>
                    Back to albums list
                </NavLink>
            </div>
            <div className='album-detail-container' style={backgorundImageStyle(previewUrl[0])}>
                <div className='title'>{album.title}</div>
                <div>{album.description}</div>
                <div>{res(allPhotos, userId).length == 1 ? '1 photo' : `${res(allPhotos, userId).length} photos`}</div>

                <NavLink to={`/users/${userId}/photos`}>By: {album.user.firstName} {album.user.lastName}</NavLink>
            </div>
            <div className='photos-container'>
                {res(allPhotos, userId).sort((a, b) => {
                const latest = new Date(a.createdAt)
                const earliest = new Date(b.createdAt)
                if (earliest.getTime() > latest.getTime()) return -1
                if (latest.getTime() > earliest.getTime()) return 1
                return 0
                }).map(photo => <div key={photo.id}><PhotoContainer photo={photo} album={album} /></div>)}
            </div>
        </div>
    )
}

//  <div ref={ref} onMouseEnter={() => setAlbumInfoBox(true)} onMouseLeave={() => setAlbumInfoBox(false)} key={photo.id}><img src={photo.url} />{albumInfoBox && <div>testing</div>}
//                 </div>
