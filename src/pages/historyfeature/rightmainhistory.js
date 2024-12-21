import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rightmainhistory.css";

// images
import message_message from "../../image/message_message.svg";
import email_message from "../../image/email_message.svg";
import whatsapp_message from "../../image/whatsapp_message.svg";
import clock_small from "../../image/clock_small.svg";
import axios from "axios";
import { HistoryIcon } from "lucide-react";

const RightmainHistory = () => {
	const [logs, setLogs] = useState([]);
	const [year, setYear] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	// const [pageSize, setPageSize] = useState(10);
	const pageSize = 10;
	const [total, setTotal] = useState(0);
	console.log(year)

	useEffect(() => {
		fetchHistory("lastWeek");
	}, []);
	const fetchHistory = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/v1/message_histories");
			setLogs(response.data.messages);
			setTotal(response.data.total);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching history:", error);
			setError(error);
			setLoading(false);
			toast.error(`Error fetching history: ${error.message}`);
		}
	};

	const handleRangeClick = (range) => {
		setPage(1);
		fetchHistory(range);
	};

	const handleYearSelect = (event) => {
		const selectedYear = event.target.value;
		setYear(selectedYear);
		setPage(1);
		if (selectedYear) {
			fetchHistory(selectedYear);
		} else {
			setLogs([]);
			setTotal(0);
		}
	};

	const renderMethodIcon = (methods) => {
		const icons = {
			sms: <img src={message_message} alt="SMS" key="sms" />,
			email: <img src={email_message} alt="Email" key="email" />,
			whatsapp: (
				<img src={whatsapp_message} alt="WhatsApp" key="whatsapp" />
			),
		};

		return methods.map(
			(method, index) => icons[method] || <div key={index}>Unknown</div>
		);
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1); // Increment page number
	};

	const handlePrevPage = () => {
		if (page > 1) {
			setPage((prevPage) => prevPage - 1); // Decrement page number, ensuring it doesn't go below 1
		}
	};

	useEffect(() => {
		fetchHistory("lastWeek"); // Fetch initial data for last week
	}, [page]); // Trigger fetchHistory whenever page changes

	return (
		<div className="w-full px-4 pt-2.5">
			<div className="w-full">
				<div className="flex items-center gap-2">
					<HistoryIcon className="size-7" />
					<h1 className="text-3xl">History</h1>
				</div>
			</div>

			{/* Buttons for time range */}
			<div className="last-btn-section-year">
				<div className="last-btn">
					<button onClick={() => handleRangeClick("lastWeek")}>
						Last Week
					</button>
					<button onClick={() => handleRangeClick("lastMonth")}>
						Last Month
					</button>
					<button onClick={() => handleRangeClick("lastYear")}>
						Last Year
					</button>
				</div>
				{/* Dropdown for selecting a specific year */}
				<div className="yearselection">
					<select
						className="year-selection-btn-history"
						onChange={handleYearSelect}
					>
						<option value="">Select Year</option>
						<option value="2024">2024</option>
						<option value="2025">2025</option>
					</select>
				</div>
			</div>

			<div className="secondhistorysection">
				<div className="historysection">
					<div className="mainnamehaddingsection">
						<h2 className="texthadding h-name">Name</h2>
						<h2 className="texthadding h-date">Date</h2>
						<h2 className="texthadding h-id">ID</h2>
						<h2 className="texthadding h-icon">Message</h2>
					</div>
					<div className="dataofhistorysection">
						{loading ? (
							<div>Loading...</div>
						) : error ? (
							<div>Error fetching data: {error.message}</div>
						) : logs.length > 0 ? (
							logs.map((log) => (
								<div
									className="datafeatchintoapi"
									key={log._id}
								>
									<h2 className="texthadding s-name">
										{log.contactName || "Unknown"}
									</h2>
									<h2 className="texthadding s-date">
										{new Date(
											log.createdAt
										).toLocaleString()}
									</h2>
									<h2 className="texthadding s-id">
										{log._id}
									</h2>
									<h2 className="texthadding s-icon">
										<div className="messageimg">
											{renderMethodIcon(log.methods)}
										</div>
									</h2>
								</div>
							))
						) : (
							<div className="no-data-message">
								No data available
							</div>
						)}
					</div>
				</div>

				{/* Pagination controls */}
				<div className="pagination-section">
					<button
						className="pagination-section-prev"
						onClick={handlePrevPage}
						disabled={page === 1}
					>
						Previous
					</button>
					<button
						className="pagination-section-next"
						onClick={handleNextPage}
						disabled={
							logs.length < pageSize || page * pageSize >= total
						}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default RightmainHistory;
