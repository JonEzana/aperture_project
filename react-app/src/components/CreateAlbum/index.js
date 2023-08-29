import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CreateAlbum.css'
import { thunkCreateAlbum, fetchUpdateAlbum } from '../../store/albums'
import { thunkGetAllPhotos } from '../../store/photos'
import { useLocation } from 'react-router-dom'
import { thunkUpdatePhotoList } from '../../store/photos'
import { useHistory } from 'react-router-dom'

export default function CreateAlbum() {
    const photos = Object.values(useSelector(state => state.photos.allPhotos))
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const type = location.state ? location.state.type : 'create'
    const albumId = location.state ? location.state.albumId : ''
    const updateAlbum = useSelector(state => state.albums.allAlbums[albumId])
    const [title, setTitle] = useState(updateAlbum ? updateAlbum.title : "")
    const [description, setDescription] = useState(updateAlbum ? updateAlbum.description : "")
    const [photoIdList, setPhotoIdList] = useState([])
    const history = useHistory()
    useEffect(() => {
        dispatch(thunkGetAllPhotos())
    }, [])

    if (!photos.length || !currentUser) return null;
    const userPhotos = photos.filter(photo => photo.userId == currentUser.id)

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

        if (type === 'create') dispatch(thunkCreateAlbum(newAlbum, currentUser.id)).then((album) => dispatch(thunkUpdatePhotoList(res, album.id))).then(()=>history.push(`/users/${currentUser.id}/albums`)).catch(e => console.log(e))
        else dispatch(fetchUpdateAlbum(albumId, currentUser.id, newAlbum)).then(album => dispatch(thunkUpdatePhotoList(res, album.id))).then(()=>history.push(`/users/${currentUser.id}/albums/${albumId}`)).catch(e => console.log(e))
    }

    return (
        <div>
            <div id='create-album'>{type === 'edit' ? 'Update Album' : 'Create Album'}</div>
            <form onSubmit={handleSubmit}>
                <div className='album-form'>
                    <div className='upper-side'>
                        <div className='left-create'>
                            <div>Album Title</div>
                            <div>
                                <input
                                    type="text"
                                    placeholder='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>Description</div>
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
                            <div id='select-photo'>Choose your photos</div>
                            <div className='photo-container'>{userPhotos.map(photo => <div className='choose-photo' key={photo.id} style={backgroundImageStyle(photo.url)}>

                                <div className='photo-div'>
                                    <input type='checkbox' value={photo.id} onChange={(e) => {
                                        if (e.target.checked) {
                                            setPhotoIdList(prev => [...prev, parseInt(e.target.value)])
                                        } else {
                                            setPhotoIdList(prev => prev.filter(id => id !== parseInt(e.target.value)))
                                        }
                                    }} />
                                </div>
                            </div>)}</div>
                        </div>
                    </div>
                    <div className='buttom-side'>
                        <button>{type === 'edit' ? 'Update Album' : 'Submit'}</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
