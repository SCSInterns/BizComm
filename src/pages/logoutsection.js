import React, { useState } from "react";
import axios from "axios";

const LogoutSection = () => {
	const [showPopup, setShowPopup] = useState(false);

	const handleLogout = async () => {
	
		try {
			const formData = new FormData();
			formData.append("client_id", localStorage.getItem("client_id"));
			formData.append(
				"client_secret",
				localStorage.getItem("client_secret")
			);
			const response = await axios.post("/oauth/revoke", formData);
			localStorage.removeItem("token");

			console.log("Logging out...", response);
			setShowPopup(false);
			window.location.href = "/login";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	async function getClientIDSecret() {
		const response = await axios.get("/api/v1/get_client_id_secret");
		if (response) {
			localStorage.setItem("client_id", response.data.client_id);
			localStorage.setItem("client_secret", response.data.client_secret);
		} else {
			console.error("Failed to get client ID and secret");
		}
	}

	return (
		<div className="logout-section">
			<button
				onClick={() => {
					setShowPopup(true);
					getClientIDSecret();
				}}>
				Logout
			</button>
			{showPopup && (
				<div className="popup">
					<div className="popup-content">
						<p>Are you sure you want to logout?</p>
						<button onClick={handleLogout}>Logout</button>
						<button onClick={() => setShowPopup(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default LogoutSection;
