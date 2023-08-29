import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CreateAlbum.css'
import { thunkCreateAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
// import { thunkUpdatePhoto } from '../../store/photos'
import { thunkUpdatePhotoList } from '../../store/photos'

export default function CreateAlbum() {
    const photos = Object.values(useSelector(state => state.photos.allPhotos))
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [photoIdList, setPhotoIdList] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllPhotos())
    }, [])

    if (!photos.length || !currentUser) return null;

    const userPhotos = photos.filter(photo => photo.userId == currentUser.id && !photo.albumId)
    console.log('user photo', userPhotos);
    const backgroundImageStyle = (photoUrl) => {
        return {
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const res = []
        const newAlbum = {
            title: title,
            description: description,
            user_id: currentUser.id
        }

        for (let id of photoIdList) {
            for (let userPhoto of userPhotos) {
                if (id == userPhoto.id) res.push(userPhoto)
            }
        }

        dispatch(thunkCreateAlbum(newAlbum, currentUser.id)).then((album) => dispatch(thunkUpdatePhotoList(res, album.id)))
    }

    // const filterPhotoList = (e) => {
    //     setPhotoIdList([e])
    //     console.log('photo list', photoIdList);
    //     console.log('e', e);
    // }
    // console.log('before', photoIdList);
    // const newArr = photoIdList
    // console.log('photo id list', photoIdList.splice(1, 1));


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='album-form'>
                    <div className='upper-side'>
                        <div className='left-create'>
                            <div>
                            <input
                                type="text"
                                placeholder='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            </div>
                            <div className='description-box'>              <textarea
                                type="text"
                                placeholder='Describe your album'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                            </div>
                        </div>
                        <div className='select-photos'>
                            <div>Choose your photos</div>
                            <div className='photo-container'>{userPhotos.map(photo => <div className='choose-photo' key={photo.id} style={backgroundImageStyle(photo.url)}>

                                <div className='photo-div'>
                                    <input type='checkbox' value={photo.id} onChange={(e) => {
                                        if (e.target.checked) {
                                            setPhotoIdList(prev => [...prev, parseInt(e.target.value)])
                                        } else {
                                            setPhotoIdList(prev => prev.filter(id => id !== parseInt(e.target.value)))
                                        }
                                    }}/>
                                </div>
                            </div>)}</div>
                        </div>
                    </div>
                    <div className='buttom-side'>
                        <button>Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
