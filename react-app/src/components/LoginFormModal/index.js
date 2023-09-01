import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
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
        history.push('/photos/all');
        closeModal();
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
    <div id="loginmodal" className="modal">
      <h2 style={{color: 'rgb(46, 147, 255)'}}>Log In</h2>
      <form onSubmit={handleSubmit} id='login-form'>
        <div id='login-input-container'>
          <input
            className="login-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type={pwType}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {showPassword === false && <i className="fa-solid fa-eye-slash" style={{color: "#000000", alignSelf: "center", position: "absolute", marginLeft: "81%", zIndex: "2"}} onClick={handleShowPW}></i>}
          {showPassword === true && <i className="fa-solid fa-eye" style={{color: "#000000", alignSelf: "center", position: "absolute", marginLeft: "81%", zIndex: "2"}} onClick={handleShowPW}></i>} */}
          {/* {errors.credential && (
            <p className="valErr">{errors.credential}</p>
          )} */}
          {errors.map((error, idx) => (
            <p className="errors" key={idx}>{error}</p>
          ))}
        </div>
        <button disabled={disabled} id={disabled ? "disabled-login-button" : "enabled-login-button"} type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
