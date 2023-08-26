import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

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
    // await dispatch(thunkGetCurrentUsersSpots());
    // history.push('/spots/current')
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
           <i class="fas fa-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
      <div className="dropdown">
        <ul className={ulClassName} ref={ulRef}>
          { user ? (
            <div className="dropdown-content loggedin">
              <p className="hello">Hello, {user.firstName}!</p>
              <p className="email">{user.email}</p>
              <hr style={{background: "black", height: "1px", width: "100%" }}/>

              <button className="manage-btn" onClick={manage}>Manage Spots</button>
              <hr style={{background: "black", height: "1px", width: "100%" }}/>

              <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="dropdown-content loggedout">
              <li className="li">
                <OpenModalButton
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                  style={{border: "none", width: "100%", fontWeight: "900", textAlign: "left"}}
                  />
                </li>
              <li className="li">
                <OpenModalButton
                  id='login_modal'
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                  style={{border: "none", width: "100%", textAlign: "left"}}
                  />
              </li>
            </div>
        )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
