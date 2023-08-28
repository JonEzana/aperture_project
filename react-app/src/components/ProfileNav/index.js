import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './ProfileNav.css'

export default function ProfileNav({userId}) {
    const photoUserString = (userId) => {
        return `/users/${userId}/photos`
    }
    const albumUserString = (userId) => {
        return `/users/${userId}/albums`
    }
    const favesUserString = (userId) => {
        return `/users/${userId}/faves`
    }

    return (
        <div className='profile-nav-div'>
            <div className='profile-nav-span-container'>
                <span className='profile-nav-span'>
                    <NavLink to={photoUserString(userId)}>Photostream</NavLink>
                    <NavLink to={albumUserString(userId)}>Albums</NavLink>
                    <NavLink to={favesUserString(userId)}>Faves</NavLink>
                </span>
            </div>
        </div>
    )
}
