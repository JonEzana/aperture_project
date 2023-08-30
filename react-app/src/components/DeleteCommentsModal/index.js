import { useDispatch } from 'react-redux';
import { thunkDeleteComment, thunkGetAllCommentsByPhotoId } from '../../store/comments';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

export const DeleteCommentsModal = ({commentId, photoId}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const yesDeleteCommentFunction = async() => {
    await dispatch(thunkDeleteComment(commentId));
    await dispatch(thunkGetAllCommentsByPhotoId(photoId))
    closeModal();
    history.push(`/photos/${photoId}`);
  }

  return (
    <div className='modal delete-modal'>
      <h3>Confirm Delete</h3>
      <button onClick={yesDeleteCommentFunction} className='yes-button'>Yes</button>
      <button onClick={closeModal} className='no-button'>No</button>
    </div>
  )
}
