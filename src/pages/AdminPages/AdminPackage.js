import React, { useEffect, useState } from "react";

import Badges from "../../components/AdminComponents/Badges";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";

import axios from "axios";
import { toast } from "react-toastify";

import AddPackageForm from "./PackageForm/AddPackageForm";
import EditPackageForm from "./PackageForm/EditPackageForm";

import { PackageIcon, PencilIcon, Trash2Icon } from "lucide-react";

import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";

const AdminPackage = () => {
	const [packageData, setPackageData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [openAddPackageForm, setOpenAddPackageForm] = useState(false);
	const [openEditPackageForm, setOpenEditPackageForm] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);

	const getPackages = () => {
		axios
			.get("api/v1/packages")
			.then((res) => {
				setIsLoading(false);
				setPackageData(res.data.packages);
			})
			.catch((err) => {
				toast.error(
					err.response.data.message ||
						err.message ||
						"Error while fetching packages"
				);
			});
	};

	useEffect(() => {
		getPackages();
	}, []);

	// Handle Edit Category
	const handleEditPackage = (pkg) => {
		setOpenEditPackageForm(true);
		setSelectedPackage(pkg);
	};

	// Handle Delete Category
	const handlePackageDelete = (packageId) => {
		axios
			.delete(`api/v1/packages/${packageId}`)
			.then((res) => {
				console.log(res);
				toast.success(
					res.data.message || "Package deleted successfully"
				);
				setPackageData(
					packageData.filter((pkg) => pkg.id !== packageId)
				);
			})
			.catch((err) => {
				console.error(err);
				toast.error(
					err.response.data.message ||
						err.message ||
						"Error deleting the package"
				);
			});
	};

	return (
		<div className="w-full h-full">
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 mb-4 !select-none">
				{/* Filters */}
				<div className="w-full flex items-center justify-between gap-4">
					<div className="flex items-center justify-center gap-2">
						<PackageIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Packages</h1>
					</div>
					<div className="flex items-center justify-center gap-2">
						<div className="relative group/addUser">
							<PackageIcon
								size={36}
								className="p-2 bg-primary rounded-lg cursor-pointer text-white"
								onClick={() => setOpenAddPackageForm(true)}
							/>
							<CustomTooltip
								text={"Add Package"}
								position={"left"}
								classes={
									"scale-0 group-hover/addUser:scale-100"
								}
							/>
						</div>
					</div>
				</div>
				{/* Search Input */}
				{/* <div className="md:w-fit w-full">
					<input
						type="search"
						value={searchQuery}
						onChange={handleSearch}
						placeholder="Search business category by name"
						className="border border-gray-500 text-gray-600 rounded-lg p-2 !outline-none font-normal text-sm px-3 w-full min-w-72"
					/>
				</div> */}
			</div>

			{/* Table Div */}
			<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3">
				<table className="table-auto w-full border !border-b-0">
					<thead className="w-full bg-primary/90">
						<tr>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">
								Sr No.
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">
								Package Name
							</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">
								Monthly Price
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
						<TableLoading
							text={"Loading Packages..."}
							loader={<LoaderWith3Lines />}
						/>
					) : (
						<tbody>
							{packageData ? (
								packageData.map((pkg, idx) => {
									return (
										<tr
											key={idx}
											className={`border-b rounded-b-xl`}>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{idx + 1}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												<Badges type={pkg.name} />
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{pkg.price === "0.0" ? (
													<p className="text-green-600 bg-green-100 border border-green-600 w-fit text-xs py-1 p-2 rounded-full">
														Free
													</p>
												) : (
													<p className="flex gap-1">
														<span>₹</span>
														<span>
															{parseInt(
																pkg.price
															)}
														</span>
													</p>
												)}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{pkg.vendors_count}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												<button
													onClick={() => {
														handleEditPackage(pkg);
													}}>
													<PencilIcon className="size-5 mr-3 text-primary" />
												</button>
												<button
													onClick={() => {
														handlePackageDelete(
															pkg.id
														);
													}}>
													<Trash2Icon className="size-5 text-red-600" />
												</button>
											</td>
										</tr>
									);
								})
							) : (
								<TableLoading
									text={"Loading"}
									loader={<LoaderWith3Lines />}
								/>
							)}
						</tbody>
					)}
				</table>
			</div>

			{/* Add Category Form Modal */}
			{openAddPackageForm && (
				<AddPackageForm
					onClose={() => setOpenAddPackageForm(false)}
					fetchCategories={getPackages}
				/>
			)}

			{/* Edit Category Form Modal */}
			{openEditPackageForm && (
				<EditPackageForm
					selectedPackage={selectedPackage}
					onClose={() => setOpenEditPackageForm(false)}
					fetchPackages={getPackages}
				/>
			)}
		</div>
	);
};

export default AdminPackage;
