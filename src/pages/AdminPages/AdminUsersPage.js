import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { CircleUserRoundIcon, FilterIcon, PencilIcon, Trash2Icon, UserIcon, UserPlusIcon } from "lucide-react";

import usePagination from "../../components/AdminComponents/usePagination";
import CustomPagination from "../../components/AdminComponents/CustomPagination";

import Badges from "../../components/AdminComponents/Badges";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";
import AddUserForm from "./UserForm/AddUserForm";
import EditUserForm from "./UserForm/EditUserForm";

import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";

const AdminUsersPage = () => {
	const [userData, setUserData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [openAddUserForm, setOpenAddUserForm] = useState(false);
	const [openEditUserForm, setOpenEditUserForm] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	// Get All Users
	const getUsers = () => {
		axios
			.get("api/v1/users")
			.then((res) => {
				setIsLoading(false);
				setUserData(res.data.users);
				setFilteredData(res.data.users);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		getUsers();
	}, []);

	// Pagination Components
	const { currentItems, currentPage, handlePageChange, totalPages } =
		usePagination(filteredData, 10);

	// Handle filter
	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = userData.filter((user) =>
			[user.name, user.email, user.mobile_number]
				.map((field) => field?.toLowerCase())
				.some((field) => field.includes(query))
		);
		setFilteredData(filtered);
	};

	const handleEditUser = (user) => {
		setSelectedUser(user);
		setOpenEditUserForm(true);
	};

	// Handle Delete User
	const handleUserDelete = (user) => {
		axios
			.delete(`api/v1/users/${user.id}`)
			.then((res) => {
				toast.success("User deleted successfully");
				setUserData(userData.filter((user_) => user_.id !== user.id));
				setFilteredData(
					filteredData.filter((user_) => user_.id !== user.id)
				);
			})
			.catch((err) => {
				console.error(err);
				toast.error(
					err.response.data.message ||
						err.message ||
						"Error deleting user"
				);
			});
	};

	return (
		<div className="w-full h-full">
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				<div className="w-full flex items-center justify-between gap-4">
					<div className="flex items-center justify-center gap-2">
						<CircleUserRoundIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Users</h1>
					</div>
					{/* Filters */}
					<div className="flex items-center justify-center gap-2">
						<div className="relative group/filter">
							<FilterIcon
								size={36}
								className="p-2 bg-primary rounded-lg cursor-pointer text-white"
							/>
							<CustomTooltip
								text={"Filter"}
								position={"bottom-right"}
								classes={"scale-0 group-hover/filter:scale-100"}
							/>
						</div>

						<div className="relative group/addUser">
							<UserPlusIcon
								size={36}
								className="p-2 bg-primary rounded-lg cursor-pointer text-white"
								onClick={() => setOpenAddUserForm(true)}
							/>
							<CustomTooltip
								text={"Add User"}
								position={"bottom-right"}
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
								ID
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
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Role
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-44">
								Business Category
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-36">
								Approval Status
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Package
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-52">
								Package Start Date
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-52">
								Package End Date
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-72">
								Address
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-24">
								Actions
							</td>
						</tr>
					</thead>
					{isLoading ? (
						<TableLoading
							text={"Loading Users ..."}
							loader={<LoaderWith3Lines />}
						/>
					) : (
						<tbody>
							{currentItems.length > 0 ? (
								currentItems.map((user, idx) => {
									const isLastRow =
										idx === filteredData.length - 1;
									const startDate = new Date(
										user.package_start_date
									);
									const endDate = new Date(
										user.package_end_date
									);

									return (
										<tr
											key={idx}
											className={`border-b ${
												isLastRow ? "rounded-xl" : ""
											}`}>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{idx + 1}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{user.name}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{user.email}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{user.mobile_number}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												<Badges type={user.role} />
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{user.business_category_name}
											</td>
											<td
												className={`p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize`}>
												<Badges
													type={user.approval_status}
												/>
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												<Badges
													type={user.package_name}
												/>
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
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
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												<button
													onClick={() => {
														handleEditUser(user);
													}}>
													<PencilIcon className="size-5 mr-3 text-primary" />
												</button>
												<button
													onClick={() => {
														handleUserDelete(user);
													}}>
													<Trash2Icon className="size-5 text-red-600" />
												</button>
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
										No Users Found
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

			{/* Add User Form Modal */}
			{openAddUserForm && (
				<AddUserForm
					onClose={() => setOpenAddUserForm(false)}
					fetchUsers={getUsers}
				/>
			)}

			{openEditUserForm && (
				<EditUserForm
					selectedUser={selectedUser}
					onClose={() => setOpenEditUserForm(false)}
					fetchUsers={getUsers}
				/>
			)}
		</div>
	);
};

export default AdminUsersPage;
