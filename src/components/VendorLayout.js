import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VendorLayout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		axios.get(`/api/v1/users/${localStorage.getItem("user_id")}`)
		.catch((err) => {
			if (err?.response?.status === 404) {
				setTimeout(() => {
					toast.error("User not found");
					localStorage.clear();
					navigate("/")
				}, 2000)
			}
		})
	}, [navigate])

	return (
		<div className="w-full h-full relative flex">
			<Sidebar />
			<div className="w-full h-full p-4 overflow-y-scroll ml-68">
				<Outlet />
			</div>
		</div>
	);
};

export default VendorLayout;
