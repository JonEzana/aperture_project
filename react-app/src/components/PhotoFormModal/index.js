import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
// import { thunkCreatePhoto,thunkUpdatePhoto } from "/../../store/photos";


function PhotoFormModalFunction () {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');


  return (
    <div>
      <h2>whatever</h2>
      <form>
        <input
          type='text'
          placeholder='Photo Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type='textarea'
          placeholder='Photo Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='url'
          placeholder='File Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button>upload photo</button>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )

}

export default PhotoFormModalFunction