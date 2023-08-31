import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom/';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import { PhotoFormModalFunction } from '../PhotoFormModalFunction';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	let homeUrl;
	sessionUser ? homeUrl = "/photos/all" : homeUrl = "/";

	return (
		<div className='nav-bar'>
          <NavLink exact to={homeUrl} style={{textDecoration: "none"}}>
            <div className="logo-btn" style={{display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: "60px"}}>
              <div className="logo-title" style={{color: "#41BEE6", textDecoration: "none", fontSize: "25px", alignSelf: "center", marginLeft: "5px", color: "white"}}>aperture</div>
            </div>
          </NavLink>
		  <span id="right-side-nav" style={{display: "flex", flexDirection: "row", justifyContent: "center", marginRight: "20px", gap: "15px"}}>
			<span className="upload-links">
				{/* {sessionUser && <NavLink to="/photos/new" className="new-spot-link">
					Upload Picture
				</NavLink>} */}
				{ sessionUser &&
					<OpenModalButton
						modalComponent={ <PhotoFormModalFunction />}
						buttonText={"Post Your Photo"}
						style={{width: "120px", backgroundColor: "transparent", color: "white", border: "none"}}
						className={"new-spot-link"}
						id={"navbarlink"}
					/>}
				{sessionUser && <NavLink to="/albums/new" className="new-spot-link">
					Upload Album
				</NavLink>}
			</span>
			{isLoaded && (
				<div className="prof-btn" style={{marginRight: "10%"}}>
				<ProfileButton user={sessionUser} />
				</div>
          )}
		  </span>
      </div>
	);
}

export default Navigation;
