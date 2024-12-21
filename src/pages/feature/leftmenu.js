import React, { useState } from "react";
import DashboardIcon from "../../image/Dashboard.svg";
import ContactsIcon from "../../image/contacts_main.svg";
import UploadIcon from "../../image/upload.svg";
import ClockIcon from "../../image/clock.svg";
import LogoutIcon from "../../image/logout.svg";
import LogoutPopIcon from "../../image/logout_pop.svg";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Leftmenu = () => {
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleDashboardClick = () => {
		navigate("/dashboard");
	};

	const handleContactClick = () => {
		navigate("/contact");
	};

	const handleUploadClick = () => {
		navigate("/upload");
	};

	const handleHistoryClick = () => {
		navigate("/history");
	};

	const handleLogout = async () => {
		try {
			const formData = new FormData();
			formData.append(
				"access_token",
				localStorage.getItem("access_token")
			);
			formData.append("client_id", localStorage.getItem("client_id"));
			formData.append(
				"client_secret",
				localStorage.getItem("client_secret")
			);

			const response = await axios.post("/oauth/revoke", formData);
			localStorage.clear();

			console.log("Logging out...", response);
			toast.success("Logout successful");
			setShowPopup(false);
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="w-full max-w-48 px-0 !m-0 h-full">
			<h1 className="text-2xl font-bold w-full text-center mb-4">
				Biz<span className="text-primary">Comm</span>Sync
			</h1>
			<div className="menuleftbutton">
				<button
					className={`left-btn-pr ${
						location.pathname === "/dashboard" ? "active" : ""
					}`}
					onClick={handleDashboardClick}>
					<img
						src={DashboardIcon}
						alt=""
						className={`lefticon-btn ${
							location.pathname === "/dashboard"
								? "active-icon"
								: ""
						}`}
					/>
					Dashboard
				</button>
				<button
					className={`left-btn-pr ${
						location.pathname === "/contact" ? "active" : ""
					}`}
					onClick={handleContactClick}>
					<img
						src={ContactsIcon}
						alt=""
						className={`lefticon-btn ${
							location.pathname === "/contact"
								? "active-icon"
								: ""
						}`}
					/>
					Contacts
				</button>
				<button
					className={`left-btn-pr ${
						location.pathname === "/upload" ? "active" : ""
					}`}
					onClick={handleUploadClick}>
					<img
						src={UploadIcon}
						alt=""
						className={`lefticon-btn ${
							location.pathname === "/upload" ? "active-icon" : ""
						}`}
					/>
					Upload
				</button>
				<button
					className={`left-btn-pr ${
						location.pathname === "/history" ? "active" : ""
					}`}
					onClick={handleHistoryClick}>
					<img
						src={ClockIcon}
						alt=""
						className={`lefticon-btn ${
							location.pathname === "/history"
								? "active-icon"
								: ""
						}`}
					/>
					History
				</button>
				<button
					className={`left-btn-pr ${
						showLogoutConfirmation ? "active" : ""
					}`}
					onClick={() => setShowLogoutConfirmation(true)}>
					<img
						src={LogoutIcon}
						alt=""
						className={`lefticon-btn ${
							showLogoutConfirmation ? "active-icon" : ""
						}`}
					/>
					Logout
				</button>
			</div>
			{showLogoutConfirmation && (
				<div className="logout-confirmation-overlay">
					<div className="logout-confirmation">
						<div className="logohadding">
							<img src={LogoutPopIcon} alt="" />
							<h3>Logout</h3>
						</div>
						<p>Are you sure you want to logout?</p>
						<div className="logoutbtn">
							<button
								onClick={() =>
									setShowLogoutConfirmation(false)
								}>
								Cancel
							</button>
							<button onClick={handleLogout}>Logout</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Leftmenu;
