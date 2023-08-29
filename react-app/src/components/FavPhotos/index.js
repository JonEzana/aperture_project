import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { useBackgroundImgContext } from '../../context/BackgroundImage'
import { thunkAllFav } from '../../store/fav';
import { Photostream } from '../Photostream';


export default function FavPhotos() {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const likedPhotos = Object.values(useSelector(state => state.favs.allFav))

    useEffect(() => {
        dispatch(thunkAllFav(userId))
    }, [])

    if (!likedPhotos.length) return null


    return (
        <div>
            <Photostream fav={likedPhotos} like={"like"} />
        </div>
    )
}
