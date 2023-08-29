import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/photos";
import { useHistory } from "react-router-dom";

export const PhotoFormModalFunction = ({ photo, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const currentUserPhotos = useSelector(state => state.photos.currentUserPhotos)
  const [title, setTitle] = useState(photo ? photo.title : '');
  const [description, setDescription] = useState(photo ? photo.description : '');
  const [url, setUrl] = useState(photo ? photo.url : '');
  const [disabled, setDisabled] = useState(true);
  const [valObj, setValObj] = useState({});
  const newData = {};

  if (photo && photo.id && photo.userId) {
    newData.id = photo.id;
    newData.userId = photo.userId;
  }

  useEffect(() => {
    const errObj = {};
    if (title && title.length < 1) errObj.title = "Title is required";
    if (description && description.length < 1) errObj.description = "Description is required";
    if (url && url.length < 1) errObj.description = "Photo URL is required";
    if (title.length > 1 && description.length > 1 && url.length > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setValObj(errObj);
  }, [title.length, description.length, url.length]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formType === "Update") {
      const finalData = {...newData, title, description, url};
      const updatedPhoto = await dispatch(sessionActions.thunkUpdatePhoto(finalData));
      if (updatedPhoto.id) {
        const updatedPhotoDetails = await dispatch(sessionActions.thunkGetSinglePhoto(updatedPhoto.id));
        history.push(`/photos/${updatedPhotoDetails.id}`)
      }
    } else {
      console.log('IN HANDLE SUBMIT')
      const data = {title, description, url, userId: currentUser.id}
      const newPhoto = await dispatch(sessionActions.thunkCreatePhoto(data));
      if (newPhoto.id) {
        console.log('SUCCESSFUL CREATION')
        await dispatch(sessionActions.thunkGetSinglePhoto(newPhoto.id));
        history.push(`/photos/${newPhoto.id}`);
      } else {
        console.log('failure')
      }
    }
  };

  return (
    <div>
      <h2>{photo ? "Update Your Photo" : "Post Your Photo"}</h2>
      <form>
        <input
          type='text'
          placeholder='Photo Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {valObj.title && <p className="errors" style={{color: "red"}}>{valObj.title}</p>}
        <textarea
          type='textarea'
          placeholder='Photo Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {valObj.description && <p className="errors" style={{color: "red"}}>{valObj.description}</p>}
        <input
          type='url'
          placeholder='File Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>}
        <button>upload photo</button>
        <button type='submit' disabled={disabled} onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )

}
