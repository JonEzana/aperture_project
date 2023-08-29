import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { fetchDeleteAlbum } from '../../store/albums'
import './DeleteAlbum.css'
export const DeleteAlbum = ({album}) => {

    
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const deleteAlbum = () => {
        dispatch(fetchDeleteAlbum(album.id)).then(closeModal)
    }
    return (
        <div className="delete-album-container">
            <div>Are you sure to delete {album.title} ?</div>
            <div id="yes-no-album">
                <button onClick={deleteAlbum}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>

        </div>
    )
}