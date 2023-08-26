import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [pwType, setPwType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  useEffect(() => {
    if (password.length >= 6) setDisabled(false);
    else setDisabled(true);
    showPassword === false ? setPwType("password") : setPwType("text");
  }, [password.length])

  const handleShowPW = () => {
    showPassword === false ? setShowPassword(true) : setShowPassword(false);
    // showPassword === true ? setPwType("text") : setPwType("password")
  };

  //route = '/login'
  return (
    // <>
    //   <h1>Log In</h1>
    //   <form onSubmit={handleSubmit}>
    //     <ul>
    //       {errors.map((error, idx) => (
    //         <li key={idx}>{error}</li>
    //       ))}
    //     </ul>
    //     <label>
    //       Email
    //       <input
    //         type="text"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <label>
    //       Password
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </label>
    //     <button type="submit">Log In</button>
    //   </form>
    // </>
    <div id="loginmodal" className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">
          <input
          className="input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{borderRadius: "10px"}}
          />
        </label>
        <label className="label">
          <div className="ogPW" style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <input
              className="input"
              type={pwType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{borderRadius: "10px"}}
            />
            {/* {showPassword === false && <i className="fa-solid fa-eye-slash" style={{color: "#000000", alignSelf: "center", position: "absolute", marginLeft: "81%", zIndex: "2"}} onClick={handleShowPW}></i>}
            {showPassword === true && <i className="fa-solid fa-eye" style={{color: "#000000", alignSelf: "center", position: "absolute", marginLeft: "81%", zIndex: "2"}} onClick={handleShowPW}></i>} */}
          </div>
        </label>
        {errors.credential && (
          <p className="valErr">{errors.credential}</p>
        )}
        <button disabled={disabled} className={disabled ? "submit" : "submit enabled"} type="submit" style={{borderRadius: "10px"}}>Log In</button>
        {/* <button className="demoUser" onClick={handleDemo} style={{borderRadius: "10px"}}>Log in as Demo User</button> */}
        {/* <hr style={{backgroundColor: "black", width: "100%", height: "1px"}} dataContent="or"></hr> */}
        {/* <p className="hrOr">or</p> */}
      </form>
      {/* <div style={{display: "flex", flexDirection: "column", gap: "14px", textAlign: "center", marginTop: "5px"}}>
        <div className="externalLinksDiv" style={{display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "8px", justifyContent: "center", gap: "10px"}}>
          <i className="fa-brands fa-facebook" style={{color: "#1361e7"}}></i>
          <a className="external-links" href="https://www.facebook.com/login/">Continue with Facebook</a>
        </div>
        <div className="externalLinksDiv" style={{display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "8px", justifyContent: "center", gap: "10px"}}>
          <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" style={{heigt: "15px", width: "15px"}}></img>
          <a className="external-links" href="https://accounts.google.com/v3/signin/identifier?ifkv=AXo7B7VEEcb1Ctp_uR-SAn5h10mreS4RHvlLTmx0tZaHiW2-MEOUfNcovW3HXcgW4itOPjZuNYgckA&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-653753290%3A1691081876573395">Continue with Google</a>
        </div>
        <div className="externalLinksDiv" style={{display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "8px", justifyContent: "center", gap: "12px"}}>
          <i className="fa-brands fa-apple" style={{color: "#000000", marginLeft: "2px"}}></i>
          <a className="external-links" href="https://apple.com">Continue with Apple</a>
        </div>
      </div> */}
    </div>
  );
}

export default LoginFormModal;
