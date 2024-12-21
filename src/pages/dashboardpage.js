import React from "react";
import "./dashboardpage.css";
import RightmainDash from "./dashfeature/rightmaindash";
import RightLastSendLog from "./dashfeature/rightlastsendlog";

const DashboardPage = () => {
	return (
		<div className="w-full h-full p-4 pt-2">
			<RightmainDash />
			<RightLastSendLog />
		</div>
	);
};
export default DashboardPage;
