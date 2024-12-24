import React, { useState } from "react";
import {
	BriefcaseBusinessIcon,
	CircleUserRoundIcon,
	LogOutIcon,
	ScrollTextIcon,
	XIcon,
	InfoIcon,
	LayoutDashboardIcon,
	PackageIcon,
	LayoutTemplateIcon,
} from "lucide-react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminSidebar = () => {
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
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
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="w-full max-w-68 px-6 py-5 min-h-screen h-full fixed left-0 top-0 bg-white z-50 border-r-[3px] border-black">
			<div className="mx-1 mt-1 mb-5">
				<Link
					to={"/admin"}
					className="text-pretty text-3xl leading-tight">
					Biz<span className="text-primary">Comm</span>Sync
				</Link>
			</div>
			<div className="w-full flex flex-col items-center justify-center">
				<Link
					to="/admin"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname === "/admin" ||
						location.pathname === "/admin/"
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<LayoutDashboardIcon />
					Dashboard
				</Link>
				<Link
					to="/admin/users"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname.startsWith("/admin/users")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					{/* <img src={ContactsIcon} alt="" className={`w-5 h-5`} /> */}
					<CircleUserRoundIcon />
					Users
				</Link>
				<Link
					to="/admin/packages"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname.startsWith(
							"/admin/packages"
						)
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<PackageIcon />
					Packages
				</Link>
				<Link
					to="/admin/business-categories"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname.startsWith(
							"/admin/business-categories"
						)
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<BriefcaseBusinessIcon />
					Business Categories
				</Link>
				<Link
					to="/admin/client-forms"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname.startsWith("/admin/client-forms")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<ScrollTextIcon />
					Client Forms
				</Link>
				<Link
					to="/admin/templates"
					className={`flex items-center gap-2.5 leading-tight font-semibold w-full mb-3 p-4 text-lg ${
						location.pathname.startsWith("/admin/templates")
							? "bg-primary/20 text-primary py-2.5 rounded-lg"
							: "text-gray-500 font-semibold py-2"
					}`}>
					<LayoutTemplateIcon />
					User Templates
				</Link>
				<button
					className={`flex items-center gap-3 w-full mb-2 text-lg p-4 py-1 text-gray-500 font-semibold`}
					onClick={() => setShowLogoutConfirmation(true)}>
					<LogOutIcon />
					Logout
				</button>
			</div>
			
			{showLogoutConfirmation && (
				<div className="fixed top-0 left-0 px-6 w-screen h-full min-h-screen flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
					<div className="w-full max-w-[500px] bg-white rounded-xl overflow-hidden relative">
						<button
							onClick={() => setShowLogoutConfirmation(false)}
							type="button"
							class="absolute top-3 end-3 text-primary bg-transparent rounded-lg size-8 ms-auto inline-flex justify-center items-center hover:bg-primary hover:text-white"
							data-modal-hide="popup-modal">
							<XIcon />
							<span class="sr-only">Close modal</span>
						</button>
						<div class="p-5 text-center flex flex-col items-center justify-center">
							<InfoIcon className="size-14 text-primary" />
							<h3 class="my-5 md:mt-5 mt-3 text-lg font-normal text-gray-600 px-2 text-pretty">
								Are you sure you want to log out? Unsaved
								changes may be lost, and your session will end.
								Confirm to proceed
							</h3>
							<div className="w-full flex items-center justify-center gap-3">
								<button
									className="py-2.5 px-4 ms-3 text-sm font-medium !outline-none rounded-lg border bg-white text-primary border-primary"
									onClick={() =>
										setShowLogoutConfirmation(false)
									}>
									No, cancel
								</button>
								<button
									className="text-white bg-primary border border-primary !outline-none focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm inline-flex items-center px-4 py-2.5 text-center"
									onClick={handleLogout}>
									Yes, logout
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminSidebar;
