import OpenModalButton from '../OpenModalButton'
import { DeleteCommentsModal } from '../DeleteCommentsModal';

export default function GetAllCommentsByPhotoIdFunction({comment, currentUser, photoId}) {

  function convertDate(date) {
    const splitData = date.split(' ')
    console.log('regular date = ', date)
    console.log('splitData = ', splitData)
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }

  console.log('commentttttttt =')
  if (comment && comment["Author"] == undefined) return <></>
    return (
      <div id='comment-item'>
            <p id='comment'>{comment?.comment}</p>
            <div id='commentator-item'>
              <span id='commentator-author'>{comment?.Author?.username}</span>
              <span id='comment-date'>{convertDate(comment?.createdAt)}</span>
            </div>
            {currentUser.id === comment.userId &&
              <OpenModalButton
              modalComponent={<DeleteCommentsModal commentId={comment.id} userid={currentUser.id} photoId={photoId}/>}
              buttonText={<i className="fas fa-trash-alt" style={{color: "#ababab"}}></i>}
              style={{backgroundColor: "transparent", border: "none"}}
              />
            }
      </div>
    )
  }
// }
