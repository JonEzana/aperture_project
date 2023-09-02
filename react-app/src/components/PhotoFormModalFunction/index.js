import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/photos";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal"

export const PhotoFormModalFunction = ({ photo, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const currentUser = useSelector(state => state.session.user);
  const currentUserPhotos = useSelector(state => state.photos.currentUserPhotos)
  const [title, setTitle] = useState(photo ? photo.title : '');
  const [description, setDescription] = useState(photo ? photo.description : '');
  const [url, setUrl] = useState(photo ? photo.url : '');
  const [disabled, setDisabled] = useState(true);
  const [valObj, setValObj] = useState({});

  useEffect(() => {
    const errObj = {};
    if (title && title.length < 1) errObj.title = "Title is required";
    if (title.length > 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setValObj(errObj);
  }, [title, url]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    closeModal();
    if (formType === "Update") {
      const picData = {title, description, photoId: photo.id};
      console.log('handle submit, photoid', picData["photoId"])
      const updatedPhoto = await dispatch(sessionActions.thunkUpdatePhoto(picData));

      if (updatedPhoto.id) {
        console.log('successful update', updatedPhoto)
        await dispatch(sessionActions.thunkGetCurrentUserPhotos(currentUser.id));
        closeModal();
        history.push(`/users/${currentUser.id}/photos`);
      }
    } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("url", url);
        const newPhoto = await dispatch(sessionActions.thunkCreatePhoto(formData));
        if (newPhoto.id) {
          await dispatch(sessionActions.thunkGetCurrentUserPhotos(currentUser.id));
          // setTitle('');
          // setDescription('');
          // setUrl('');
          history.push(`/users/${currentUser.id}/photos`);
        }
    }
  };

  return (
    <div id="photo-form-modal">
      <h2>{photo ? "Update Your Photo" : "Upload Your Photo"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id="photo-form">
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
        {formType !== "Update" &&
          <input
            type='file'
            placeholder='File Url'
            onChange={(e) => setUrl(e.target.files[0])}
            required
            accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
          />}
        {valObj.url && <p className="errors" style={{color: "red"}}>{valObj.url}</p>}
        <button type='submit' disabled={disabled} >Submit</button>
      </form>
    </div>
  )

}
