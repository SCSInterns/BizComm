import React, { useEffect, useState } from "react";
import axios from "axios";
import "./rightmaindash.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Images
import layout from "../../image/layout.svg";
import { useNavigate } from "react-router-dom";

const RightmainDash = () => {
	const navigate = useNavigate();
	const [totalConnections, setTotalConnections] = useState(0);
	const [messageCount, setMessageCount] = useState(0);

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

		const fetchTotalMessages = async () => {
			try {
				const response = await axios.get("api/v1/message_histories");
				setMessageCount(response.data.messages.length);
			} catch (error) {
				console.error("Error fetching messages:", error);
				toast.error(
					`Error fetching messages: ${
						error.response.data.message || error.message
					}`
				);
			}
		};

		fetchTotalConnections();
	}, []);

	// useEffect(() => {
	//     const fetchMessageCount = async () => {
	//         try {
	//             const response = await axiosInstance.get('/api/v1/message_histories');
	//             setMessageCount(response.data.messageCount);
	//         } catch (error) {
	//             console.error('Error fetching message count:', error);
	//             toast.error(`Error fetching message count: ${error.message}`);
	//         }
	//     };

	//     fetchMessageCount();
	// }, []);

	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center">
				<div className="flex mb-3">
					<img src={layout} alt="" className="layoutimg" />
					<h1 className="main-text-left">Dashboard</h1>
				</div>
			</div>
			<div className="w-full h-[90px] rounded-lg bg-gray-100 flex items-center justify-between ">
				<div className="w-full flex flex-col items-center justify-center">
					<h2 className="font-bold">Total message</h2>
					<h1 className="font-bold text-primary text-2xl">150</h1>
				</div>
				{/* Vertical Line */}
				<div className="verticalline-small" />
				<div className="w-full flex flex-col items-center justify-center">
					<h2 className="font-bold">Today message Send</h2>
					<h1 className="font-bold text-primary text-2xl">
						{messageCount}
					</h1>
				</div>
				{/* Vertical Line */}
				<div className="verticalline-small" />
				<div className="w-full flex flex-col items-center justify-center">
					<h2 className="font-bold">Not send message</h2>
					<h1 className="font-bold text-primary text-2xl">138</h1>
				</div>
				{/* Vertical Line */}
				<div className="verticalline-small" />
				<div className="w-full flex flex-col items-center justify-center">
					<h2 className="font-bold">Total person connect</h2>
					<h1 className="font-bold text-primary text-2xl">
						{totalConnections}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default RightmainDash;
