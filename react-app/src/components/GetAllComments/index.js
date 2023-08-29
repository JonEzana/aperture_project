import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllCommentsByPhotoId } from '../../store/comments';
import { thunkGetAllUsers } from "../../store/users";
import { useParams } from 'react-router-dom';

export default function GetAllCommentsByPhotoIdFunction() {
  const dispatch = useDispatch();
  const { photoId } = useParams();
  const comments = Object.values(useSelector(state => state.comments.photo));
  const users = Object.values(useSelector(state => state.users.allUsers));
  console.log('this is comments =', comments)

  useEffect(() => {
    dispatch(thunkGetAllCommentsByPhotoId(photoId));
    dispatch(thunkGetAllUsers());
  }, [dispatch]);

  comments.forEach(comment => {
    comment['Author'] = users.filter(user => user.id == comment.userId)     //user_id becomes userId in models to_dict method
  });

  function convertDate(date) {
    const splitData = date.split(' ')
    // console.log('regular date = ', date)
    // console.log('splitData = ', splitData)
    const cleanData = `${splitData[2]} ${splitData[1]}, ${splitData[3]}`
    return cleanData;
  }


if (!users.length) {
  return <h1>hi</h1>
}

if (!comments.length) {
  return (
    <>
      <p>Be the first to comment!</p>
    </>
  )
} else {
  return (
    <div>
      {comments.toReversed().map(comment => 
        <div id='comment-item' key={comment.id}>
          <p>{comment?.comment}</p>
          <div>
          <p style={{border:'1px solid red', height:'50px'}}>{comment?.Author.firstName}</p>
          <p>{convertDate(comment?.createdAt)}</p>
          </div>
        </div>)}
    </div>
  )
}




}