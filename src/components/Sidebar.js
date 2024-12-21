import React, { useState } from "react";
// import "../pages/feature/leftmenu.css";
// import DashboardIcon from "../image/Dashboard.svg";
// import ContactsIcon from "../image/contacts_main.svg";
// import UploadIcon from "../image/upload.svg";
// import ClockIcon from "../image/clock.svg";
// import LogoutIcon from "../image/logout.svg";
// import LogoutPopIcon from "../image/logout_pop.svg";

import {
	ContactIcon,
	HistoryIcon,
	LayoutDashboardIcon,
	LayoutTemplateIcon,
	LogOutIcon,
	SettingsIcon,
	UploadIcon,
} from "lucide-react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { InfoIcon } from "lucide-react";

const Sidebar = () => {
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

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
		<div className="w-full max-w-68 p-6 border-r-2 border-black h-full min-h-dvh fixed top-0 left-0">
			<h1 className="text-3xl font-bold w-full text-center mb-4">
				Biz<span className="text-primary">Comm</span>Sync
			</h1>
			<div className="w-full flex flex-col items-center justify-center">
				<Link
					to="/vendor/dashboard"
					className={`flex items-center gap-2.5 font-semibold w-full mb-2 p-4 text-xl ${
						location.pathname.startsWith("/vendor/dashboard")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<LayoutDashboardIcon />
					Dashboard
				</Link>
				<Link
					to="/vendor/contact"
					className={`flex items-center gap-2.5 font-semibold w-full mb-2 p-4 text-xl ${
						location.pathname.startsWith("/vendor/contact")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<ContactIcon />
					Contact
				</Link>
				<Link
					to="/vendor/upload"
					className={`flex items-center gap-2.5 font-semibold w-full mb-2 p-4 text-xl ${
						location.pathname.startsWith("/vendor/upload")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<UploadIcon />
					Upload
				</Link>
				<Link
					to={"/vendor/templates"}
					className={`flex items-center gap-3 w-full mb-2 text-xl p-4 ${
						location.pathname.startsWith("/vendor/templates")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
						<LayoutTemplateIcon />
						Templates
					</Link>
				<Link
					to="/vendor/history"
					className={`flex items-center gap-3 w-full mb-2 text-xl p-4 ${
						location.pathname.startsWith("/vendor/history")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<HistoryIcon />
					History
				</Link>
				<Link
					to="/vendor/meta-settings"
					className={`flex items-center gap-3 w-full mb-2 text-xl p-4 ${
						location.pathname.startsWith("/vendor/meta-settings")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<SettingsIcon />
					Meta Settings
				</Link>
				<button
					className={`flex items-center gap-3 w-full mb-2 text-xl p-4 py-1 text-gray-500 font-semibold`}
					onClick={() => setShowLogoutConfirmation(true)}>
					<LogOutIcon />
					Logout
				</button>
			</div>
			{showLogoutConfirmation && (
				<div className="fixed top-0 left-0 !z-[100] px-6 w-screen h-full min-h-screen flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
					<div className="w-full max-w-[500px] bg-red-50 rounded-lg !z-50">
						<div className="flex items-center justify-center gap-2 w-full border-black border-b px-8 py-4">
							<InfoIcon className="text-red-600" />
							<h3 className="text-2xl text-red-600">Logout</h3>
						</div>
						<p className="w-full text-center py-6 text-xl px-8">
							Are you sure you want to logout?
						</p>
						<div className="w-full flex items-center justify-center gap-3 px-8 py-4 border-t border-black">
							<button
								className="border border-black rounded-lg px-3 py-1.5"
								onClick={() =>
									setShowLogoutConfirmation(false)
								}>
								Cancel
							</button>
							<button
								className="border  border-red-600 bg-red-600 text-white rounded-lg px-3 py-1.5"
								onClick={handleLogout}>
								Logout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
