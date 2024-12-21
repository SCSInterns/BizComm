import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultProfile from "../../image/profile_user.svg";
import "./rightmainprofile.css";
import axios from "axios";

const RightMainProfile = ({ userId }) => {
	// const [userId, setUserId] = useState(userId);
	const [totalConnections, setTotalConnections] = useState(0);
	const [profileData, setProfileData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		occupation: "",
		package: "",
		package_price: "",
		clientsCount: 0,
		profileImage: defaultProfile,
	});

	// Fetch user ID on component mount
	useEffect(() => {
		const fetchUserId = async () => {
			try {
				const token = localStorage.getItem("access_token");
				if (!token) {
					throw new Error("No token found");
				}
			} catch (error) {
				console.error("Error fetching userId:", error);
				toast.error(`Error fetching userId: ${error.message}`);
			}
		};
		fetchUserId();
	}, []);

	// Fetch user data based on user ID
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`api/v1/users/${userId}`);
				const userData = response.data.user;
				setProfileData({
					name: userData.name,
					email: userData.email,
					phone: userData.mobile_number,
					address: userData.address,
					occupation: userData.business_category_name,
					package: userData.package_name,
					package_price: userData.package_price,
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
				toast.error(`Error fetching user data: ${error.message}`);
			}
		};

		if (userId) {
			fetchUserData();
		}
	}, [userId]);

	// Fetch total connections (example)
	useEffect(() => {
		const fetchTotalConnections = async () => {
			try {
				const response = await axios.get("api/v1/clients");
				setTotalConnections(response.data.clients.length);
			} catch (error) {
				console.error("Error fetching total connections:", error);
				toast.error(
					`Error fetching total connections: ${error.message}`
				);
			}
		};

		fetchTotalConnections();
	}, []);

	return (
		<div className="rightmainprofile-ggm w-full">
			<div className="bg-primary w-full h-[302px] rounded-tr-[50px] rounded-tl-[50px]">
				<div className="thiredsection-ggm w-3/4 h-auto pt-32 pb-10 bg-[#f4f4f4] relative top-2/4 left-[12.5%] flex flex-col justify-center items-center rounded-[40px] [box-shadow:8px_2px_20px_#928f8f]">
					<div className="profileImage-ggm w-48 h-48 bg-[#e6e6e6] absolute rounded-[200px] -top-[100px] [box-shadow:8px_2px_20px_#928f8f] flex items-center justify-center">
						<label htmlFor="profileImageInput">
							<img
								src={defaultProfile}
								alt="Profile"
								className="profile-image-size-ggm w-[120px] h-[200px] rounded-full"
							/>
						</label>
					</div>
					<div className="relative flex items-center justify-center flex-col">
						<h1 className="text-4xl text-primary mb-2 font-bold">
							{profileData.name}
						</h1>
						<h4 className="text-lg text-[#646464] font-medium mb-2">
							{profileData.address}
						</h4>
						<h3 className="text-lg text-[#646464] font-medium mb-2">
							{profileData.phone}
						</h3>
						<h3 className="text-lg text-[#646464] font-medium mb-2">
							{profileData.email}
						</h3>
						<h2 className="capitalize flex items-center text-lg justify-center gap-1 mb-1">
							<span className="text-[#646464] font-semibold">
								Occupation:
							</span>
							{profileData.occupation}
						</h2>
						<h2 className="capitalize flex items-center text-lg justify-center gap-1 mb-6">
							<span className=" text-[#646464] font-semibold">
								Package:
							</span>
							{profileData.package}
						</h2>
						<div className="show-borod-ggm flex flex-row items-center justify-center">
							<div className="client-profile-btn-ggm">
								<h1 className="show-borod-count-ggm text-3xl text-primary">
									{totalConnections}
								</h1>
								<h4 className="show-borod-name-ggm">Clients</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightMainProfile;
