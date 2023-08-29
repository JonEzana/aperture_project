const GET_ALL_COMMENTS = 'comments/GET_ALL';

const getAllCommentsByPhotoId = (comments) => ({    //need to specify cuz later we might wanna make get all comments by current user.
  type: GET_ALL_COMMENTS,
  payload: comments
});

export const thunkGetAllCommentsByPhotoId = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${photoId}`);
  if (res.ok) {
    const commentsData = await res.json();
    dispatch(getAllCommentsByPhotoId([...Object.values(commentsData)]));
    return commentsData;
  }
}


const initialState = { user: {}, photo: {} };   // user:{} is for if we wish to implement manage all comments by current user, not gonna touch.

export default function commentReducer (state = initialState, action) {
  let newState;
  switch(action.type) {
    case GET_ALL_COMMENTS: {
      console.log('REDUCER, action.payload', action.payload)
      newState = {...state, photo: {}}
      action.payload.forEach(comment => {
        newState.photo[comment.id] = comment
      })
      return newState;
    }
    default:
      return state;
  }
}
