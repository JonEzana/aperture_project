const GET_ALL_COMMENTS = 'comments/GET_ALL';
const CREATE_COMMENT = 'comments/createComment';

const getAllCommentsByPhotoId = (comments) => ({    //need to specify cuz later we might wanna make get all comments by current user.
  type: GET_ALL_COMMENTS,
  payload: comments
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
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
    default:
      return state;
  }
}
