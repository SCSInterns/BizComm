import React from "react";
import RightMainProfile from "./rightmainprofile";
import "./rightmenuprofile.css";

const RightMenuProfile = () => {
	const userId = localStorage.getItem("user_id");
	return (
		<div className="rightmenuprofile">
			<RightMainProfile userId={userId} />
		</div>
	);
};

export default RightMenuProfile;
