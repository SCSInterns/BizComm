import React, { useEffect, useState } from "react";
import AdminSidebar from "../pages/AdminPages/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import NotAuthorizedPage from "./AdminComponents/NotAuthorizedPage";

const AdminLayout = () => {
	const navigate = useNavigate();
	const [authorized, setAuthorized] = useState(true);

	useEffect(() => {
		const user_id = localStorage.getItem("user_id");
		if (user_id) {
			axios
				.get(`/api/v1/is_admin`)
				.then((response) => {
					if (response.data.success === false) setAuthorized(false);
				})
				.catch((err) => {
					toast.error(err.response.data.message || "An error occurred while checking admin status.");
				});
		} else {
			toast.error("Please login first to access this page.");
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="w-full h-full relative flex font-">
			{authorized ? (
				<>
					<AdminSidebar />
					<div className="w-full h-full min-h-[calc(100vh-64px)] p-6 overflow-y-scroll ml-68">
						<Outlet />
					</div>
				</>
			) : (
				<NotAuthorizedPage authorized={authorized} />
			)}
		</div>
	);
};

export default AdminLayout;
