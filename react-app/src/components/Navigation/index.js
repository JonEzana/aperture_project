import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>
		<div className='nav-bar'>
          <NavLink exact to="/" style={{textDecoration: "none"}}>
            <div className="logo-btn" style={{display: "flex", flexDirection: "row", justifyContent: "center", marginLeft: "60px"}}>
              <i className="fa-brands fa-airbnb" style={{color: "#41BEE6", fontSize: "45px"}}></i>
              <div className="logo-title" style={{color: "#41BEE6", textDecoration: "none", fontSize: "25px", alignSelf: "center", marginLeft: "5px", color: "white"}}>aperture</div>
            </div>
          </NavLink>
		  <span id="right-side-nav" style={{display: "flex", flexDirection: "row", justifyContent: "center", marginRight: "20px", gap: "15px"}}>
			<span className="upload-links">
				{sessionUser && <NavLink to="/spots/new" className="new-spot-link">
					Upload Picture
				</NavLink>}
				{sessionUser && <NavLink to="/spots/new" className="new-spot-link">
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
