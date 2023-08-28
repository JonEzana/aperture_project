import { useDispatch } from 'react-redux';
import { thunkDeletePhoto, thunkGetCurrentUserPhotos } from '../../store/photos';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

function DeletePhotoModalFunction({photoId, userid}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const yesDeletePhotoFunction = async() => {
    await dispatch(thunkDeletePhoto(photoId));
    await dispatch(thunkGetCurrentUserPhotos(userid))
    closeModal();
    history.push(`/users/${userid}/photos`);
  }

  return (
    <div className='modal delete-modal'>
      <h3>Confirm Delete</h3>
      <button onClick={yesDeletePhotoFunction} className='yes-button'>Yes</button>
      <button onClick={closeModal} className='no-button'>No</button>
    </div>
  )
}

export default DeletePhotoModalFunction;
