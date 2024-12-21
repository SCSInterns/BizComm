import React from "react";
import "./profilepage.css";
import RightMenuProfile from "./profilefeture/rightmenuprofile";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
	return (
		<div className="main-profilepage">
			<Sidebar />
			<div className="verticalline"></div>
			<div className="rightside-section-profile">
				<RightMenuProfile />
			</div>
		</div>
	);
};

export default ProfilePage;
