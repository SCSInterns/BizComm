// import React, { useState, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./rightdoughnutchart.css";

// const RightDoughnutChart = () => {
	// const [selected, setSelected] = useState(null);
	// const [selectedYear, setSelectedYear] = useState(null);
	// const [data, setData] = useState({
		// labels: ["SMS", "Whatsapp", "Email"],
		// datasets: [
		// 	{
		// 		data: [0, 0, 0],
		// 		backgroundColor: [
		// 			"rgba(108, 99, 255, 1)",
		// 			"rgba(204, 204, 204, 1)",
		// 			"rgba(97, 97, 97, 1)",
		// 		],
		// 		hoverOffset: 4,
		// 	},
		// ],
	// });
	// const [noData, setNoData] = useState(false);

	// const fetchData = async (period) => {
	//   try {
	//     const token = localStorage.getItem('access_token');
	//     if (!token) {
	//       toast.error('No token found');
	//       return;
	//     }
	//     const response = await axios.get(`http://localhost:5000/api/dashboard/message-count/${period}`, {
	//       headers: {
	//         'Authorization': `Bearer ${token}`
	//       }
	//     });
	//     const messageCount = response.data.messageCount;
	//     const totalCount = messageCount.reduce((acc, count) => acc + count, 0);
	//     const percentageData = messageCount.map(count => (totalCount > 0 ? (count / totalCount) * 100 : 0));

	//     if (totalCount === 0) {
	//       setNoData(true);
	//       setData({
	//         labels: ['SMS', 'Whatsapp', 'Email'],
	//         datasets: [{
	//           data: [0, 0, 0],
	//           backgroundColor: [
	//             'rgba(108, 99, 255, 1)',
	//             'rgba(204, 204, 204, 1)',
	//             'rgba(97, 97, 97, 1)',
	//           ],
	//           hoverOffset: 4
	//         }]
	//       });
	//     } else {
	//       setNoData(false);
	//       setData({
	//         labels: ['SMS', 'Whatsapp', 'Email'],
	//         datasets: [{
	//           data: percentageData,
	//           backgroundColor: [
	//             'rgba(108, 99, 255, 1)',
	//             'rgba(204, 204, 204, 1)',
	//             'rgba(97, 97, 97, 1)',
	//           ],
	//           hoverOffset: 4
	//         }]
	//       });
	//     }
	//   } catch (error) {
	//     console.error('Error fetching data:', error);
	//     toast.error(`Error fetching data: ${error.message}`);
	//   }
	// };

	// const handleTimePeriodChange = (timePeriod) => {
	//   fetchData(timePeriod);
	// };

	// const handleYearChange = (year) => {
	//   fetchData(year);
	//   setSelectedYear(year);
	// };

	// const handleYearSelect = (event) => {
	//   const selectedYear = parseInt(event.target.value);
	//   setSelectedYear(selectedYear);
	//   handleYearChange(selectedYear);
	// };

	// const years = [2024, 2025];

	// const options = {
	// 	plugins: {
	// 		tooltip: {
	// 			callbacks: {
	// 				label: function (context) {
	// 					const label =
	// 						context.chart.data.labels[context.dataIndex] ||
	// 						"SMS";
	// 					const percent = context.raw || 0;
	// 					return `${label}: ${percent.toFixed(2)}%`;
	// 				},
	// 			},
	// 		},
	// 	},
	// 	onClick: (event, elements) => {
	// 		if (elements.length) {
	// 			setSelected(elements[0].index);
	// 		}
	// 	},
	// 	maintainAspectRatio: false,
	// 	cutoutPercentage: 80,
	// 	legend: {
	// 		position: "right",
	// 		offsetY: 0,
	// 		height: 230,
	// 	},
	// };

	// useEffect(() => {
	//   fetchData('week');
	// }, []);

	// return (
	// 	<div className="w-full">
	// 		<div className="btn-chart-section">
	// 			<div className="time-period-buttons">
	// 				{/* <button className="time-period-buttons-btn" onClick={() => handleTimePeriodChange('week')}>Last Week</button> */}
	// 				{/* <button className="time-period-buttons-btn" onClick={() => handleTimePeriodChange('month')}>Last Month</button> */}
	// 				{/* <button className="time-period-buttons-btn" onClick={() => handleTimePeriodChange('year')}>Last Year</button> */}
	// 			</div>

	// 			{/* <div className="year-selection">
	// 				{/* <select onChange={handleYearSelect} className="year-selection-btn"> 
	// 				<select className="year-selection-btn">
	// 					<option value="">Select Year</option>
	// 					{years.map(year => (
	// 					<option key={year} value={year}>{year}</option>
	// 					))}
	// 				</select>
	// 			</div> */}
	// 		</div>

	// 		<div id="chart" className="chartdatadoughnut">
	// 			{noData ? (
	// 				<div className="no-data-message">No data available</div>
	// 			) : (
	// 				""
	// 				// <Doughnut data={data} options={options} />
	// 			)}
	// 		</div>
	// 	</div>
	// );
// };

// export default RightDoughnutChart;
