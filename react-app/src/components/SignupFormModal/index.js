import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {signUp} from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [buttonClass, setButtonClass] = useState("disabled-signup-button")
	const { closeModal } = useModal();

    // First name, last name: 3 <= len <= 50,
    //bio: textarea, len <= 200, not being valided in backend
    //profilepic: url required

	    //route = '/signup'

	useEffect(() => {
		const errObj = {};
		if (username && username.length < 4) errObj.username = "Username must be at least 4 characters long";
		if (password && password.length < 6) errObj.password = "Password must be at least 6 characters long";
		if (firstName && (firstName.length < 3 || firstName.length > 50)) errObj.firstName = "First name must be between 3 and 50 characters";
		if (lastName && (lastName.length < 3 || lastName.length > 50)) errObj.lastName = "Last name must be between 3 and 50 characters";
		if (bio && bio.length > 200) errObj.bio = "Bio must be 200 characters or less";
		if (confirmPassword && confirmPassword !== password) errObj.confirmPassword = "Password and Confirm Password fields must match";
		// if (profilePic.length === 0) errObj.profilePic = "Profile pic required";
		// if (email.length === 0) errObj.email = "Email is required";
		if (username.length >= 4 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50 && bio.length <= 200 && password === confirmPassword) {
			setDisabled(false);
			setButtonClass("submit-signup-button")
		}
		setErrors(errObj);
	}, [firstName.length, lastName.length, username.length, password.length]);

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (password === confirmPassword) {
	// 		const data = await dispatch(signUp(username, email, password));
	// 		if (data) {
	// 			setErrors(data);
	// 		} else {
	// 			closeModal();
	// 		}
	// 	} else {
	// 		setErrors([
	// 			"Confirm Password field must be the same as the Password field",
	// 		]);
	// 	}
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const userData = {email,
			  username,
			  firstName,
			  lastName,
			  password
			}
			console.log('In Handle submit.....', userData)
		  setErrors({});
		  return dispatch(
			signUp({
			  userData
			})
		  )
			.then(closeModal)
			.catch(async (res) => {
			  const data = await res.json();
			  if (data && data["errors"]) {
				setErrors(data["errors"]);
			  }
			});
		  }
		  return setErrors({
			confirmPassword: "Confirm Password field must be the same as the Password field"
		  });
	  };

	//   const isDisabled = () => {
	// 	if (!email) return true;
	// 	else if (!profilePic) return true;
	// 	else if (!username) return true;
	// 	else if (!bio) return true;
	// 	else if (!firstName) return true;
	// 	else if (!lastName) return true;
	// 	else if (!password) return true;
	// 	else if (username.length < 4 || password.length < 6) return true;
	// 	else if (firstName.length < 3 || firstName.length > 50) return true;
	// 	else if (lastName.length < 3 || lastName.length > 50) return true;
	// 	else if (bio.length > 200) return true;
	// 	else return false;
	//   };

	//   const disabledClassNameFunction = () => {
	// 	if (!email) return "disabled-signup-button";
	// 	else if (!profilePic) return "disabled-signup-button";
	// 	else if (!username) return "disabled-signup-button";
	// 	else if (!bio) return "disabled-signup-button";
	// 	else if (!firstName) return "disabled-signup-button";
	// 	else if (!lastName) return "disabled-signup-button";
	// 	else if (!password) return "disabled-signup-button";
	// 	else if (username.length < 4 || password.length < 6) return "disabled-signup-button";
	// 	else if (firstName.length < 3 || firstName.length > 50) return "disabled-signup-button";
	// 	else if (lastName.length < 3 || lastName.length > 50) return "disabled-signup-button";
	// 	else if (bio.length > 200) return "disabled-signup-button";
	// 	else return "submit-signup-button";
	//   };

	return (
		<div id="signup-modal">
			<h1>Sign Up for Aperture</h1>
			<form onSubmit={handleSubmit}>
				{/* <ul>
					{Object.keys(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}adf
				</ul> */}
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="First Name"
					/>
				</label>
				{errors.firstName && <p className="errors">{errors.firstName}</p>}
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="Last Name"
					/>
				</label>
				{errors.lastName && <p className="errors">{errors.lastName}</p>}
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
					/>
				</label>
				{errors.username && <p className="errors">{errors.username}</p>}

				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				{errors.email && <p className="errors">{errors.email}</p>}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</label>
				{errors.password && <p className="errors">{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
				<label>
					Bio
					<textarea
						type="textarea"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						placeholder="Bio"
					/>
				</label>
				{errors.bio && <p className="errors">{errors.bio}</p>}
				<label>
					Profile Pic
					<input
						type="url"
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
						placeholder="Profile Picture"
						required
					/>
				</label>
				<button disabled={disabled} className={buttonClass} type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
