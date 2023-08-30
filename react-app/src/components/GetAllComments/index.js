import OpenModalButton from '../OpenModalButton'
import { DeleteCommentsModal } from '../DeleteCommentsModal';

export default function GetAllCommentsByPhotoIdFunction({comment, currentUser, photoId}) {
  function convertDate(date) {
    const splitData = date.split(' ')
    // console.log('regular date = ', date)
    // console.log('splitData = ', splitData)
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }
  if (comment && comment["Author"] == undefined) return <></>

  if (!Object.values(comment).length) {
    return (
      <>
        <p>Be the first to comment!</p>
      </>
    )
  } else {
    return (
      <div>
            <p>{comment?.comment}</p>
            <div>
              <p>{comment?.Author?.username}</p>
              <p>{convertDate(comment?.createdAt)}</p>
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
}
