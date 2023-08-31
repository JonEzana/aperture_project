import React from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import "./LandingPage.css"


function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const LoginTheDemoUserFunction = () => {
        const email = 'demo@aa.io';
        const password = 'password';
        return dispatch(sessionActions.login(email, password))
          .then (() => history.push('/photos/all'))
          .catch(async (res) => {
            const data = await res.json();
          });
      }

    return (
        <div style={{backgroundImage: "url('https://images8.alphacoders.com/132/1320554.png')", height: "105vh", width: "105vw", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", padding: "0px", margin: "-23px 0 0 -6px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h1 style={{color: "white", paddingLeft: "100px", marginBottom: "100px"}}>Find your inspiration.</h1>
            <button onClick={LoginTheDemoUserFunction}>Demo User</button>
            <img className="background-image"></img>
        </div>
    )
}

export default LandingPage
