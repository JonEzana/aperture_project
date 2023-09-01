import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import {useHistory} from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState('');
	const [profilePic, setProfilePic] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [buttonId, setButtonId] = useState("disabled-signup-button");
	const [imageLoading, setImageLoading] = useState(false);
	const { closeModal } = useModal();

	useEffect(() => {
		const errObj = {};
		if (username && username.length < 4) errObj.username = "Username must be at least 4 characters long";
		if (password && password.length < 6) errObj.password = "Password must be at least 6 characters long";
		if (firstName && (firstName.length < 3 || firstName.length > 50)) errObj.firstName = "First name must be between 3 and 50 characters";
		if (lastName && (lastName.length < 3 || lastName.length > 50)) errObj.lastName = "Last name must be between 3 and 50 characters";
		if (bio && bio.length > 200) errObj.bio = "Bio must be 200 characters or less";
		if (confirmPassword && confirmPassword !== password) errObj.confirmPassword = "Password and Confirm Password fields must match";

		if (username.length >= 4 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50 && bio.length <= 200 && password === confirmPassword) {
			setDisabled(false);
			setButtonId("enabled-signup-button")
		}
		setErrors(errObj);
	}, [firstName, lastName, username, password, confirmPassword]);

	const handleSubmit = async (e) => {
		if (profilePic === null) {
			const signUpData = {email, username, firstName, lastName, profilePic: 'https://aperture-bucket-april-2023.s3.amazonaws.com/default.jpeg', password}
			await dispatch(sessionActions.signUpNoFile(signUpData));
			closeModal();
			setEmail('')
			setUsername('')
			setPassword('')
			setProfilePic('')
			setFirstName('')
			setLastName('')
			history.push("/photos/all");
		} else{
			e.preventDefault();
			const formData = new FormData()
			formData.append("email", email)
			formData.append("username", username)
			formData.append("first_name", firstName)
			formData.append("last_name", lastName)
			formData.append("profile_pic", profilePic)
			formData.append("password", password)
			formData.append("bio", bio)
			console.log(formData)
			await dispatch(sessionActions.signUp(formData));
			closeModal();
			setEmail('')
			setUsername('')
			setPassword('')
			setProfilePic('')
			setFirstName('')
			setLastName('')
			history.push("/photos/all");
		}
	};
	return (
		<div className='modal' id="signup-modal">
			<h2 style={{color: 'rgb(46, 147, 255)', paddingTop: '2px', paddingBottom: '4px'}}>Sign Up for Aperture</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data" id='signup-form'>
				{/* <ul>
					{Object.keys(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}adf
				</ul> */}
				<div id='signup-input-container'>

						<input
							className="signup-input"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							placeholder="First Name"
						/>

					{errors.firstName && <p className="errors">{errors.firstName}</p>}

						<input
							className="signup-input"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							placeholder="Last Name"
						/>

					{errors.lastName && <p className="errors">{errors.lastName}</p>}


						<input
							className="signup-input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							placeholder="Username"
						/>

					{errors.username && <p className="errors">{errors.username}</p>}


						<input
							className="signup-input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Email"
						/>

					{errors.email && <p className="errors">{errors.email}</p>}

						<input
							className="signup-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Password"
						/>

					{errors.password && <p className="errors">{errors.password}</p>}

						<input
							className="signup-input"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="Confirm Password"
						/>

					{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}

						<textarea
							className="signup-input"
							type="textarea"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							placeholder="Bio"
							style={{height: '80px'}}
						/>

					{errors.bio && <p className="errors">{errors.bio}</p>}

						<input
							className="signup-input"
							type="file"
							onChange={(e) => setProfilePic(e.target.files[0])}
							placeholder="Profile Picture"
							accept="image/*"
						/>

				</div>
				<button disabled={disabled} id={buttonId} type="submit">Sign Up</button>
				{(imageLoading)&& <p>Loading...</p>}
			</form>
		</div>
	);
}

export default SignupFormModal;
