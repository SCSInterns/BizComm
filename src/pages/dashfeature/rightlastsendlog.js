import React, { useEffect, useRef, useState } from "react";
import { Grid, html } from "gridjs";

// import { toast } from "react-toastify";
import "./rightlastsendlog.css";
import "react-toastify/dist/ReactToastify.css";
import { ArrowUpDownIcon, PencilIcon, Trash2Icon } from "lucide-react";
import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";
import usePagination from "../../components/AdminComponents/usePagination";
import CustomPagination from "../../components/AdminComponents/CustomPagination";

const RightLastSendLog = () => {
	// const wrapperRef = useRef(null);
	// const sortBtn = <ArrowUpDownIcon />;

	// const sortSvg = `<svg fill="currentColor" class="size-5 text-primary" viewBox="0 0 16 16">
	// 					<path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
	// 				</svg>`;

	// const grid = new Grid({
	// 	columns: [
	// 		{
	// 			name: html(
	// 				`<div class="w-full flex items-center justify-between gap-2 px-3 py-2">
	// 					<span>Name</span>
	// 					<button class="" onclick="window.sortColumn(0)">
	// 						${sortSvg}
	// 					</button>
	// 				</div>`
	// 			),
	// 			formatter: (cell) => cell,
	// 			sortable: true,
	// 		},
	// 		{
	// 			name: html(
	// 				`<div class="w-full flex items-center justify-between gap-2 px-3 py-2">
	// 					<span>Email</span>
	// 					<button class="">
	// 						${sortSvg}
	// 					</button>
	// 				</div>`
	// 			),
	// 			formatter: (cell) => cell,
	// 			sortable: true,
	// 		},
	// 		{
	// 			name: html(
	// 				`<div class="w-full flex items-center justify-between gap-2 px-3 py-2">
	// 					<span>Phone Number</span>
	// 					<button class="">
	// 						${sortSvg}
	// 					</button>
	// 				</div>`
	// 			),
	// 			formatter: (cell) => cell,
	// 			sortable: true,
	// 		},
	// 		// "Email",
	// 		// "Phone Number",
	// 	],
	// 	data: [
	// 		["John", "john@example.com", "(353) 01 222 3333"],
	// 		["Mark", "mark@gmail.com", "(01) 22 888 4444"],
	// 		["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
	// 		["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
	// 		["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
	// 		["John", "john@example.com", "(353) 01 222 3333"],
	// 		["Mark", "mark@gmail.com", "(01) 22 888 4444"],
	// 		["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
	// 		["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
	// 		["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
	// 		["John 2", "john@example.com", "(353) 01 222 3333"],
	// 		["Mark 2", "mark@gmail.com", "(01) 22 888 4444"],
	// 		["Eoin 2", "eoin@gmail.com", "0097 22 654 00033"],
	// 		["Sarah 2", "sarahcdd@gmail.com", "+322 876 1233"],
	// 		["Afshin 2", "afshin@mail.com", "(353) 22 87 8356"],
	// 		["John 2", "john@example.com", "(353) 01 222 3333"],
	// 		["Mark 2", "mark@gmail.com", "(01) 22 888 4444"],
	// 		["Eoin 2", "eoin@gmail.com", "0097 22 654 00033"],
	// 		["Sarah 2", "sarahcdd@gmail.com", "+322 876 1233"],
	// 		["Afshin 2", "afshin@mail.com", "(353) 22 87 8356"],
	// 	],
	// 	className: {
	// 		container: "my-6 w-full",
	// 		table: "!w-full border-collapse border border-black !rounded-lg",
	// 		search: "search-div border border-black !outline-none rounded-lg p-2 px-3 mb-5 font-normal w-full max-w-60",
	// 		thead: "border border-blue-600 !rounded-t-lg",
	// 		th: "text-center text-primary text-lg",
	// 		td: "text-sm  font-normal p-2 px-3",
	// 		pagination:
	// 			"flex md:flex-row flex-col justify-between items-center mt-3",
	// 		paginationSummary: "text-primary text-sm font-normal",
	// 		paginationButton:
	// 			"text-primary text-sm border border-primary mx-0.5 px-2.5 py-1 rounded",
	// 		paginationButtonCurrent:
	// 			"bg-primary text-white text-sm border border-primary px-2.5 py-1 rounded",
	// 		paginationButtonNext:
	// 			"cursor-pointer disabled:cursor-not-allowed disabled:!opacity-50 text-sm !mx-2",
	// 		paginationButtonPrev:
	// 			"cursor-pointer disabled:cursor-not-allowed disabled:!opacity-50 text-sm !mx-2",
	// 	},
	// 	style: {
	// 		table: {
	// 			width: "100%",
	// 			maxWidth: "100%",
	// 		},
	// 	},
	// 	// sort: true,
	// 	pagination: true,
	// 	search: true,
	// });

	// useEffect(() => {
	// 	grid.render(wrapperRef.current);
	// });

	// window.sortColumn = (columnIndex) => {
	// 	grid.updateConfig({
	// 		sort: {
	// 			column: columnIndex,
	// 			direction: "asc", // Change to "desc" if needed
	// 		},
	// 	}).forceRender();
	// };

	// useEffect(() => {
	//   const fetchLogs = async () => {
	//     try {
	//       const response = await axiosInstance.get('/dashboard/last-logs');
	//       setLogs(response.data);
	//     } catch (error) {
	//       console.error('Error fetching last logs:', error);
	//       toast.error(`Error fetching last logs: ${error.message}`);
	//     }
	//   };

	//   fetchLogs();
	// }, []);

	const data = [
		["John", "john@example.com", "(353) 01 222 3333"],
		["Mark", "mark@gmail.com", "(01) 22 888 4444"],
		["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
		["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
		["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
		["John", "john@example.com", "(353) 01 222 3333"],
		["Mark", "mark@gmail.com", "(01) 22 888 4444"],
		["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
		["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
		["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
		["John 2", "john@example.com", "(353) 01 222 3333"],
		["Mark 2", "mark@gmail.com", "(01) 22 888 4444"],
		["Eoin 2", "eoin@gmail.com", "0097 22 654 00033"],
		["Sarah 2", "sarahcdd@gmail.com", "+322 876 1233"],
		["Afshin 2", "afshin@mail.com", "(353) 22 87 8356"],
		["John 2", "john@example.com", "(353) 01 222 3333"],
		["Mark 2", "mark@gmail.com", "(01) 22 888 4444"],
		["Eoin 2", "eoin@gmail.com", "0097 22 654 00033"],
		["Sarah 2", "sarahcdd@gmail.com", "+322 876 1233"],
		["Afshin 2", "afshin@mail.com", "(353) 22 87 8356"],
	];

	const [filteredData, setFilteredData] = useState(data);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Pagination Components
	const { currentItems, currentPage, handlePageChange, totalPages } =
		usePagination(filteredData, 10);

	// Handle filter
	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = data.filter((user) =>
			// [user.name, user.email, user.mobile_number]
			[user[0], user[1], user[2]]
				.map((field) => field?.toLowerCase())
				.some((field) => field.includes(query))
		);
		setFilteredData(filtered);
	};

	return (
		<div className="w-full h-full">
			{/* Old Table */}
			{/* <div
				ref={wrapperRef}
				className="border w-full"
				style={{ width: "100%", overflowX: "auto" }}
			/> */}

			{/* New Table */}
			{/* <div className="w-full h-full">
				<div className="w-full h-full overflow-x-scroll">
					<table className="w-full border border-black !rounded-lg">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone Number</th>
							</tr>
						</thead>
						<tbody>{data.map((row, idx) => {
							return (
								<tr key={idx}>
									<td className="font-normal text-sm">{row[0]}</td>
									<td className="font-normal text-sm">{row[1]}</td>
									<td className="font-normal text-sm">{row[2]}</td>
								</tr>
							)
						})}</tbody>
					</table>
				</div>
			</div> */}
			<div className="w-full h-full flex flex-col items-start justify-start gap-1 mt-5">
				{/* Search Div */}
				<div className="w-full h-fit flex items-center justify-end gap-2">
					{/* Search Input */}
					<div className="md:w-fit w-full">
						<input
							type="search"
							value={searchQuery}
							onChange={handleSearch}
							placeholder="Search clients by name, email, number"
							className="border border-gray-500 text-gray-600 rounded-lg p-2 !outline-none font-normal text-sm px-3 w-full min-w-80"
						/>
					</div>
				</div>

				{/* Table Div */}
				<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3 w-full">
					<table className="table-auto w-full border">
						<thead className="w-full bg-primary/90">
							<tr>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">
									Sr No.
								</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
									Name
								</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
									Email
								</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
									Mobile Number
								</td>
								{/* <td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-24">
								Actions
							</td> */}
							</tr>
						</thead>
						{isLoading ? (
							<TableLoading
								text={"Loading Clients ..."}
								loader={<LoaderWith3Lines />}
							/>
						) : (
							<tbody>
								{currentItems.length > 0 ? (
									currentItems.map((user, idx) => {
										// const isLastRow =
										// 	idx === filteredData.length - 1;
										// const startDate = new Date(
										// 	user.package_start_date
										// );
										// const endDate = new Date(
										// 	user.package_end_date
										// );

										return (
											<tr
												key={idx}
												className={`border-b`}>
												<td className="p-3 text-xs font-normal text-gray-700 w-fit h-full">
													{idx + 1}
												</td>
												<td className="p-3 text-xs font-normal text-gray-700 w-fit h-full capitalize">
													{user[0]}
													{/* {user.name} */}
												</td>
												<td className="p-3 text-xs font-normal text-gray-700 w-fit h-full">
													{user[1]}
													{/* {user.email} */}
												</td>
												<td className="p-3 text-xs font-normal text-gray-700 w-fit h-full capitalize">
													{user[2]}
													{/* {user.mobile_number} */}
												</td>
												{/* <td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{startDate.toLocaleString(
													"en-US",
													{
														day: "2-digit",
														month: "short",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit",
														hour12: true,
													}
												)}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{endDate.toLocaleString(
													"en-US",
													{
														day: "2-digit",
														month: "short",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit",
														hour12: true,
													}
												)}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{user.address}
											</td> */}
												{/* <td className="p-3 text-xs font-normal text-gray-700 w-fit h-full">
												<button>
													<PencilIcon className="size-4 mr-3 text-primary" />
												</button>
												<button>
													<Trash2Icon className="size-4 text-red-600" />
												</button>
											</td> */}
											</tr>
										);
									})
								) : (
									<tr className="text-xl">
										<td
											colSpan={
												document.querySelectorAll(
													"thead tr:first-child td"
												).length || 12
											}
											className=" w-full border p-4">
											No Clients Found
										</td>
									</tr>
								)}
							</tbody>
						)}
					</table>
				</div>
				<CustomPagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default RightLastSendLog;
