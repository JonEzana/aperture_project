import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css"

function LandingPage() {
    return (
        <div style={{backgroundImage: "url('https://images8.alphacoders.com/132/1320554.png')", height: "105vh", width: "105vw", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", padding: "0px", margin: "-23px 0 0 -6px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h1 style={{color: "white", paddingLeft: "100px", marginBottom: "100px"}}>Find your inspiration.</h1>
            <img className="background-image"></img>
        </div>
    )
}

export default LandingPage
