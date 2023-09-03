import OpenModalButton from '../OpenModalButton'
import { DeleteCommentsModal } from '../DeleteCommentsModal';

export default function GetAllCommentsByPhotoIdFunction({comment, currentUser, photoId}) {

  function convertDate(date) {
    const splitData = date.split(' ')
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }

  if (comment && comment["Author"] == undefined) return <></>
    return (
      <div id='comment-card'>
        <div id='comment-and-trash'>
          <div id='comment'>{comment?.comment}</div>
          {currentUser.id === comment.userId &&
            <OpenModalButton
              modalComponent={<DeleteCommentsModal commentId={comment.id} userid={currentUser.id} photoId={photoId}/>}
              buttonText={<i className="fas fa-trash-alt" id='comment-trash-icon'></i>}
              id='comment-trash-button'
            />
          }
        </div>
        <span id='commentator-item'>
          <span id='commentator-author'>{comment?.Author?.username}</span>
          <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
        </span>
      </div>
    )
  }
// }
