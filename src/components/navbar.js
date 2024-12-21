import React from "react";
import { connect } from "react-redux";
import { login } from "./actions";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Navbar.css";
import BizCommSync from "../image/BizCommSync.svg";

const Navbar = ({ isLoggedIn, login }) => {
	const navigate = useNavigate();

	const handleSignUpClick = () => {
		navigate("/sign-up");
	};
	const handleLoginClick = () => {
		navigate("/login");
	};

	return (
		<div className="navbar">
			<div className="navbar-left">
				<img src={BizCommSync} alt="Logo" className="logo" />
			</div>
			<div className="navbar-middle">
				<ul className="menu">
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">About Us</a>
					</li>
					<li>
						<a href="#">Services</a>
					</li>
				</ul>
			</div>
			<div className="navbar-right">
				{!isLoggedIn && (
					<button className="signup-btn" onClick={handleSignUpClick}>
						Sign Up
					</button>
				)}
				{!isLoggedIn && (
					<button className="login-btn" onClick={handleLoginClick}>
						Login
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
