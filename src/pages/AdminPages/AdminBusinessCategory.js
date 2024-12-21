import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import usePagination from "../../components/AdminComponents/usePagination";
import CustomPagination from "../../components/AdminComponents/CustomPagination";

import { BriefcaseBusinessIcon, PencilIcon, Trash2Icon } from "lucide-react";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";

import AddBusinessCategoryForm from "./BusinessCategoryForm/AddBusinessCategoryForm";
import EditBusinessCategoryForm from "./BusinessCategoryForm/EditBusinessCategoryForm";
import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";

const AdminBusinessCategory = () => {
	const [businessCategoryData, setBusinessCategoryData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [openAddCategoryForm, setOpenAddCategoryForm] = useState(false);
	const [openEditCategoryForm, setOpenEditCategoryForm] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({});

	const [isLoading, setIsLoading] = useState(true);

	// Fetch all business categories
	const getBusinessCategoriess = () => {
		axios
			.get("api/v1/business_categories")
			.then((res) => {
				setIsLoading(false)
				setBusinessCategoryData(res.data.business_categories);
				setFilteredData(res.data.business_categories);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		getBusinessCategoriess();
	}, []);

	// Pagination Components
	const { currentItems, currentPage, handlePageChange, totalPages } =
		usePagination(filteredData, 10);

	// Handle filter
	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = businessCategoryData.filter((category) =>
			[category.name]
				.map((field) => field?.toLowerCase())
				.some((field) => field.includes(query))
		);
		setFilteredData(filtered);
	};

	// Handle Edit Category
	const handleEditCategory = (category) => {
		setOpenEditCategoryForm(true);
		setSelectedCategory(category);
	};

	// Handle Delete Category
	const handleCategoryDelete = (categoryId) => {
		axios
			.delete(`api/v1/business_categories/${categoryId}`)
			.then((res) => {
				console.log(res);
				toast.success(
					res.data.message || "Business Category deleted successfully"
				);
				setBusinessCategoryData(
					businessCategoryData.filter(
						(category) => category.id !== categoryId
					)
				);
				setFilteredData(
					filteredData.filter(
						(category) => category.id !== categoryId
					)
				);
			})
			.catch((err) => {
				console.error(err);
				toast.error(
					err.response.data.message ||
						err.message ||
						"Error deleting business category"
				);
			});
	};

	return (
		<div className="w-full h-full">
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				{/* Filters */}
				<div className="w-full flex items-center justify-between gap-4">
				<div className="flex items-center justify-center gap-2">
						<BriefcaseBusinessIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Business Categories</h1>
					</div>
					<div className="flex items-center justify-center gap-2">
						<div className="relative group/addUser">
							<BriefcaseBusinessIcon
								size={36}
								className="p-2 bg-primary rounded-lg cursor-pointer text-white"
								onClick={() => setOpenAddCategoryForm(true)}
							/>
							<CustomTooltip
								text={"Add Business Category"}
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
						placeholder="Search business category by name"
						className="border border-gray-500 text-gray-600 rounded-lg p-2 !outline-none font-normal text-sm px-3 w-full min-w-72"
					/>
				</div>
			</div>

			{/* Table Div */}
			<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3">
				<table className="table-auto w-full border">
					<thead className="w-full bg-primary/90">
						<tr>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">
								ID
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Category Name
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
								Vendors Count
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-24">
								Actions
							</td>
						</tr>
					</thead>
					{isLoading ? (
						<TableLoading text={"Loading Business Categories..."} loader={<LoaderWith3Lines />} />
					) : (
						<tbody>
							{currentItems.length > 0 ? (
								currentItems.map((category, idx) => {
									return (
										<tr
											key={idx}
											className={`border-b rounded-b-xl`}>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{idx + 1}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{category.name}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{category.vendors_count}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												<button
													onClick={() => {
														handleEditCategory(
															category
														);
													}}>
													<PencilIcon className="size-5 mr-3 text-primary" />
												</button>
												<button
													onClick={() => {
														handleCategoryDelete(
															category.id
														);
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
										className=" w-full border p-4 font-normal">
										No Category Found with name{" "}
										<b>{searchQuery}</b>
									</td>
								</tr>
							)}
						</tbody>
					)}
				</table>
			</div>

			{/* Pagination */}
			<CustomPagination
				currentPage={currentPage}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
			/>

			{/* Add Category Form Modal */}
			{openAddCategoryForm && (
				<AddBusinessCategoryForm
					onClose={() => setOpenAddCategoryForm(false)}
					fetchCategories={getBusinessCategoriess}
				/>
			)}

			{/* Edit Category Form Modal */}
			{openEditCategoryForm && (
				<EditBusinessCategoryForm
					selectedCategory={selectedCategory}
					onClose={() => setOpenEditCategoryForm(false)}
					fetchCategories={getBusinessCategoriess}
				/>
			)}
		</div>
	);
};

export default AdminBusinessCategory;
