import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { thunkGetCurrentUserPhotos } from "../../store/photos";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    history.push('/');

  };

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.thunkLogout());
  //   closeMenu()
  //   history.push('/')
  // };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  const manage = async (e) => {
    e.preventDefault();
    closeMenu();
    await dispatch(thunkGetCurrentUserPhotos());
    history.push(`/users/${user.id}/photos`)
  }

  return (
    <>
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul> */}
      <button onClick={openMenu} className='profile-button'>
          {/* <i className="fa-solid fa-bars"></i>
           */}
          <i className="fas fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
      <div className="dropdown">
        <ul className={ulClassName} ref={ulRef}>
          { user ? (
            <div className="dropdown-content loggedin">
              <p className="hello">Hello, {user.firstName}!</p>
              <p className="email">{user.email}</p>
              <hr style={{background: "black", height: "1px", width: "100%" }}/>

              <button className="manage-btn" onClick={manage}>My Photos</button>
              <hr style={{background: "black", height: "1px", width: "100%" }}/>

              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="dropdown-content loggedout" id='logged-out-menu'>
              <div className='single-button-container-div'>
                <li className="li">
                  <OpenModalButton
                    className = 'sign-up-button'
                    buttonText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                    // style={{border: "1px solid red", width: "90%", fontWeight: "500", textAlign: "left", height: "90%"}}
                    />
                  </li>
                </div>
                <div className='single-button-container-div'>
                  <li className="li">
                    <OpenModalButton
                      className = 'sign-up-button'
                      id='login_modal'
                      buttonText="Log In"
                      onItemClick={closeMenu}
                      modalComponent={<LoginFormModal />}
                      />
                  </li>
               </div>
            </div>
        )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
