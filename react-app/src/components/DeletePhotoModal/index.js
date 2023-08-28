import { useDispatch } from 'react-redux';
import { thunkDeletePhoto } from '../../store/photos';
import { useModal } from '../../context/Modal';


function DeletePhotoModalFunction({photoId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  async function yesDeletePhotoFunction() {
    await dispatch(thunkDeletePhoto(photoId))
    closeModal();
  }

  return (
    <div className='modal delete-modal'>
      <h3>Confirm Delete</h3>
      <button onClick={() => yesDeletePhotoFunction()} className='yes-button'>Yes</button>
      <button onClick={() => closeModal()} className='no-button'>No</button>
    </div>
  )
}

export default DeletePhotoModalFunction;