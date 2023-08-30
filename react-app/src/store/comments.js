const GET_ALL_COMMENTS = 'comments/GET_ALL';
const CREATE_COMMENT = 'comments/createComment';
const DELETE_COMMENT = 'comments/deleteComment';

const getAllCommentsByPhotoId = (comments) => ({    //need to specify cuz later we might wanna make get all comments by current user.
  type: GET_ALL_COMMENTS,
  payload: comments
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})

export const thunkGetAllCommentsByPhotoId = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${photoId}`);
  if (res.ok) {
    const commentsData = await res.json();
    dispatch(getAllCommentsByPhotoId([...Object.values(commentsData)]));
    return commentsData;
  }
}

export const thunkCreateComment = (data, photoId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${photoId}/new`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const commentData = await res.json();
    dispatch(createComment(commentData));
    return commentData
  } else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  console.log('In thunk')
  const res = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE"
  });
  if (res.ok) {

  console.log('res.ok')
    dispatch(deleteComment(commentId));
  } else {
    console.log('error')
    const error = res.json()
    throw error
}
}

const initialState = { userComments: {}, photoComments: {} };   // user:{} is for if we wish to implement manage all comments by current user, not gonna touch.

export default function commentReducer (state = initialState, action) {
  let newState;
  switch(action.type) {
    case GET_ALL_COMMENTS: {
      console.log('REDUCER, action.payload', action.payload)
      newState = {...state, photoComments: {}}
      action.payload.forEach(comment => {
        newState.photoComments[comment.id] = comment
      })
      return newState;
    }
    case CREATE_COMMENT: {
      console.log('REDUCER...', action.payload)
      const newState = {...state, photoComments: {...state.photoComments}};
      newState.photoComments[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {

  console.log('in reducer, action.payload', action.payload)
      const newState = {...state, photoComments: {...state.photoComments}};
      delete newState.photoComments[action.payload];
      console.log('reducer newstate', newState)
      return newState;
    }
    default:
      return state;
  }
}
