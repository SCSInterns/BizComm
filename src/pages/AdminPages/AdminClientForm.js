import React, { useEffect, useState } from "react";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";
import {
	EyeIcon,
	ScrollTextIcon,
	PlusIcon,
	PencilIcon,
} from "lucide-react";
import axios from "axios";

import usePagination from "../../components/AdminComponents/usePagination";
import CustomPagination from "../../components/AdminComponents/CustomPagination";
import ViewClientForm from "../AdminPages/ClientForm/ViewClientForm";
import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";
import AdminAddClientForm from "./ClientForm/AdminAddClientForm";
import AdminEditClientForm from "./ClientForm/AdminEditClientForm";

const AdminClientForm = () => {
	const [clientFormsData, setClientFormsData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [openViewClientForm, setOpenViewClientForm] = useState(false);
	const [openEditClientForm, setOpenEditClientForm] = useState(false);
	const [openAddClientForm, setOpenAddClientForm] = useState(false);
	const [selectedForm, setSelectedForm] = useState(null);

	const fetchClientForms = () => {
		axios
			.get("api/v1/client_forms")
			.then((res) => {
				setIsLoading(false);
				setClientFormsData(res.data.forms);
				setFilteredData(res.data.forms);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchClientForms();
	}, []);

	const { currentItems, currentPage, handlePageChange, totalPages } =
		usePagination(filteredData, 10);

	// Handle View Client Form
	const handleViewClientForm = (client_form) => {
		setSelectedForm(client_form);
		setOpenViewClientForm(true);
	};

	// Handle Edit Client Form
	const handleEditClientForm = (client_form) => {
		setOpenEditClientForm(true);
		setSelectedForm(client_form);
	};

	// Handle filter
	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = clientFormsData.filter((form) =>
			[form.user.name]
				.map((field) => field?.toLowerCase())
				.some((field) => field.includes(query))
		);
		setFilteredData(filtered);
	};

	return (
		<div className="w-full h-full">
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				{/* Filters */}
				<div className="w-full flex items-center justify-between gap-4">
				<div className="flex items-center justify-center gap-2">
						<ScrollTextIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Client Forms</h1>
					</div>
					<div className="flex items-center justify-center gap-2">
						{/* <div className="relative group/filter">
							<FilterIcon
								size={36}
								className="p-2 bg-primary rounded-lg cursor-pointer text-white"
							/>
							<CustomTooltip
								text={"Filter"}
								position={"bottom-right"}
								classes={"scale-0 group-hover/filter:scale-100"}
							/>
						</div> */}
						<div
							className="relative group/addUser"
							onClick={() => {
								setOpenAddClientForm(true);
							}}>
							<div className="p-2 pr-[18px] relative bg-primary rounded-lg cursor-pointer text-white flex items-center justify-center gap-1">
								<ScrollTextIcon size={20} />
								<PlusIcon
									size={13}
									className="absolute right-1.5 top-2.5"
								/>
							</div>
							<CustomTooltip
								text={"Add Client Form"}
								position={"left"}
								classes={
									"scale-0 group-hover/addUser:scale-100"
								}
							/>
						</div>
					</div>
				</div>
				{/* Search Input */}
				<div className="md:w-fit w-full">
					<input
						type="search"
						value={searchQuery}
						onChange={handleSearch}
						placeholder="Search users by name, email, number"
						className="border border-gray-500 text-gray-600 rounded-lg p-2 !outline-none font-normal text-sm px-3 w-full min-w-72"
					/>
				</div>
			</div>
			{/* Table Div */}
			<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3">
				<table className="table-auto w-full border !border-b-0">
					<thead className="w-full bg-primary/90">
						<tr>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">
								Vendor ID
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Vendor Name
							</td>
							{/* <td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
								View Vendor
							</td> */}
							{/* <td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
								View Form
							</td> */}
							{/* <td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Approval Status
							</td> */}
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-24">
								Actions
							</td>
						</tr>
					</thead>
					{isLoading ? (
						<TableLoading
							text={"Loading Client Forms..."}
							loader={<LoaderWith3Lines />}
						/>
					) : (
						<tbody>
							{currentItems.length > 0 ? (
								currentItems.map((form, idx) => {
									return (
										<tr key={idx} className={`border-b`}>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{form.user.id}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{form.user.name}
											</td>
											<td className="p-4 flex items-center gap-4 text-sm font-normal text-gray-700 w-fit h-full">
												<button
													onClick={() => {
														handleViewClientForm(
															form
														);
													}}>
													<EyeIcon className="text-primary cursor-pointer" />
												</button>
												<button
													onClick={() => {
														handleEditClientForm(
															form
														);
													}}>
													<PencilIcon className="text-yellow-500 hover:text-primary cursor-pointer size-5" />
												</button>
												{/* <button
													onClick={() => {
														handleClientFormDelete(
															form
														);
													}}>
													<Trash2Icon className="size-5 text-red-600" />
												</button> */}
											</td>
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
										No Client Forms Found
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

			{/* View Client Form Modal */}
			{openViewClientForm && (
				<ViewClientForm
					form={selectedForm}
					onClose={() => setOpenViewClientForm(false)}
					openEditForm={() => {
						setOpenViewClientForm(false);
						setOpenEditClientForm(true);
					}}
				/>
			)}

			{/* Add Client Form Modal */}
			{openAddClientForm && (
				<AdminAddClientForm
					users={clientFormsData}
					onClose={() => setOpenAddClientForm(false)}
					fetchClients={fetchClientForms}
				/>
			)}

			{/* Edit Client Form Modal */}
			{openEditClientForm && (
				<AdminEditClientForm
					form={selectedForm}
					onClose={() => setOpenEditClientForm(false)}
					fetchClients={fetchClientForms}
				/>
			)}
		</div>
	);
};

export default AdminClientForm;
