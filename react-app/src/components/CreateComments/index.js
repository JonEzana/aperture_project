import { useEffect, useState } from "react";
import { thunkCreateComment, thunkGetAllCommentsByPhotoId } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkGetSinglePhoto } from "../../store/photos";

export const CreateComments = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector(state => state.comments.photoComments);
    const {photoId} = useParams();
    const user = useSelector(state => state.session.user);
    const [commentTxt, setCommentTxt] = useState('');
    const [valObj, setValObj] = useState({});
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const errObj = {};
        if (commentTxt && (commentTxt.length < 3 || commentTxt.length > 100)) errObj.commentTxt = "Comments must be between 3 and 100 characters";
        if (commentTxt.length > 3 && commentTxt.length < 100) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        setValObj(errObj);
    }, [dispatch, commentTxt.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = {comment: commentTxt, userId: user.id, photoId: +photoId};
        const newComment = await dispatch(thunkCreateComment(commentData, photoId));
        if (newComment.id) {
            await dispatch(thunkGetAllCommentsByPhotoId(+photoId))
            await dispatch(thunkGetSinglePhoto(+photoId))
            setCommentTxt('')
            history.push(`/photos/${photoId}`)
        }
    }

    return (
        <div id='post-comment-section'>
            <form onSubmit={handleSubmit} id='comment-mini-form'>
                <textarea
                    placeholder="Leave your comment here!"
                    value={commentTxt}
                    onChange={(e) => setCommentTxt(e.target.value)}
                    type="textarea"
                    style={{height:'200px'}}
                />
                {valObj.commentTxt && <p className="errors">{valObj.commentTxt}</p>}
                <button type="submit" disabled={disabled} id='comment-post-button'>Post</button>
            </form>
        </div>
    )
}
