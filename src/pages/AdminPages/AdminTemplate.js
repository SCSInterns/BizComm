/** @format */

import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/AdminComponents/CustomPagination";
import {
	FileTextIcon,
	FilterIcon,
	ImageIcon,
	LayoutTemplateIcon,
	PencilIcon,
	Trash2Icon,
	VideoIcon,
} from "lucide-react";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";
import TableLoading from "../../components/TableLoading";
import usePagination from "../../components/AdminComponents/usePagination";
import { toast } from "react-toastify";
import axios from "axios";
import Badges from "../../components/AdminComponents/Badges";
import EditTemplateForm from "./TemplateForm/EditTemplateForm";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";
import FilterHeaderComponent from "../../components/FilterHeaderComponent";

const AdminTemplate = () => {
	const [templateData, setTemplateData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [tempTypeFilters, setTempTypeFilters] = useState([]);
	const [tempLangFilters, setTempLangFilters] = useState([]);
	const [tempCatFilters, setTempCatFilters] = useState([]);
	const [tempStatusFilters, setTempStatusFilters] = useState([]);

	const [openFiltersDiv, setOpenFiltersDiv] = useState(true);
	const [openEditTemplateForm, setOpenEditTemplateForm] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	const fetchTemplates = () => {
		axios.get("api/v1/all_templates").then(res => {
			setTemplateData(res.data.templates);
			setFilteredData(res.data.templates);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		fetchTemplates();
	}, []);

	// Pagination Components
	const { currentItems, currentPage, handlePageChange, totalPages } = usePagination(filteredData, 10);

	// Handle filter
	const handleSearch = e => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		const filtered = templateData.filter(template =>
			[template.template_name, template.user.name]
				.map(field => field?.toLowerCase())
				.some(field => field.includes(query))
		);
		setFilteredData(filtered);
	};

	const handleEditTemplate = template => {
		setSelectedTemplate(template);
		setOpenEditTemplateForm(true);
	};

	// Handle Delete User
	const handleDeleteTemplate = template => {
		axios
			.delete(`api/v1/user_templates/${template.id}`)
			.then(res => {
				toast.success(res.data.message || "Template deleted successfully");
				setTemplateData(templateData.filter(template_ => template_.id !== template.id));
				setFilteredData(filteredData.filter(template_ => template_.id !== template.id));
			})
			.catch(err => {
				console.error(err);
				toast.error(err.response.data.message || err.message || "Error deleting template");
			});
	};

	const handleFilterChange = (e, setState, stateArray) => {
		console.clear();
		const { value } = e.target;
		if (stateArray.includes(value)) setState(stateArray.filter(item => item !== value));
		else setState([...stateArray, value]);
	};

	const applyFilters = () => {
		let filtered = [...templateData];
		if (tempTypeFilters.length > 0)
			filtered = filtered.filter(template => tempTypeFilters.includes(template.template_type));
		if (tempLangFilters.length > 0)
			filtered = filtered.filter(temp => tempLangFilters.includes(temp.template_language));
		if (tempCatFilters.length > 0)
			filtered = filtered.filter(template => tempCatFilters.includes(template.template_category));
		if (tempStatusFilters.length > 0)
			filtered = filtered.filter(temp => tempStatusFilters.includes(temp.template_status));

		setFilteredData(filtered);
	};

	const clearFilters = () => {
		setTempTypeFilters([]);
		setTempLangFilters([]);
		setTempCatFilters([]);
		setTempStatusFilters([]);
		document.querySelectorAll("input[type='checkbox']").forEach(element => {
			element.checked = false;
		});
		applyFilters();
	};

	const templateTypeIcons = {
		image: <ImageIcon className="size-4" />,
		video: <VideoIcon className="size-4" />,
		document: <FileTextIcon className="size-4" />,
	};

	return (
		<div>
			{/* Header Div Table */}
			<div className="w-full h-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				<div className="w-full flex items-center justify-between gap-4 relative">
					<div className="flex items-center justify-center gap-2">
						<LayoutTemplateIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Templates</h1>
					</div>
					<div className="relative group/filter">
						<FilterIcon
							size={36}
							className="p-2 bg-primary rounded-lg cursor-pointer text-white"
							onClick={() => setOpenFiltersDiv(!openFiltersDiv)}
						/>
						<CustomTooltip text={"Filter"} position={"left"} classes={"scale-0 group-hover/filter:scale-100"} />
					</div>
					<FilterHeaderComponent headerText={"Filter Templates"} openFiltersDiv={openFiltersDiv}>
						<div className="w-full flex flex-col gap-1 border-t border-gray-300 px-3 py-2.5">
							<p className="text-sm font-medium text-gray-500">Template Type</p>
							<div className="w-full flex flex-wrap gap-3 ml-px gap-y-0">
								{["image", "video", "pdf", "message only"].map(type => (
									<label key={type} className="text-[13px] font-normal flex items-center justify-center">
										<input
											type="checkbox"
											name="type"
											onChange={e => handleFilterChange(e, setTempTypeFilters, tempTypeFilters)}
											value={type}
											className="size-3 mr-1"
										/>
										{type}
									</label>
								))}
							</div>
						</div>
						<div className="w-full flex flex-col items-start gap-1 border-t border-gray-300 px-3 py-2.5">
							<p className="text-sm font-medium text-gray-500">Template Language</p>
							<select
								className="text-xs w-full border border-gray-500 rounded p-1 !outline-none font-normal min-w-80"
								onChange={e => setTempLangFilters([e.target.value])}>
								<option value="en">English</option>
								<option value="en_us">English(US)</option>
								<option value="en_uk">English(UK)</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
							</select>
						</div>
						<div className="w-full flex flex-col gap-1 border-t border-gray-300 px-3 py-2.5">
							<p className="text-sm font-medium text-gray-500">Template Category</p>
							<div className="w-full flex flex-wrap gap-3 ml-px gap-y-0">
								{["utility", "marketing", "authentication"].map(category => (
									<label key={category} className="text-[13px] font-normal flex items-center justify-center">
										<input
											type="checkbox"
											name="category"
											onChange={e => handleFilterChange(e, setTempCatFilters, tempCatFilters)}
											value={category}
											className="size-3 mr-1"
										/>
										{category}
									</label>
								))}
							</div>
						</div>
						<div className="w-full flex flex-col gap-1 border-t border-gray-300 px-3 py-2.5">
							<p className="text-sm font-medium text-gray-500">Template Type</p>
							<div className="w-full flex flex-wrap gap-2 ml-px gap-y-0">
								{["pending", "approved", "rejected"].map(status => (
									<label key={status} className="text-[13px] font-normal flex items-center justify-center">
										<input
											type="checkbox"
											name="status"
											onChange={e => handleFilterChange(e, setTempStatusFilters, tempStatusFilters)}
											value={status}
											className="size-3 mr-1"
										/>
										{status}
									</label>
								))}
							</div>
						</div>
						<div className="w-full flex items-center justify-center gap-2 px-3 mt-1 mb-3">
							<button
								className="bg-primary/90 text-white px-2 py-1.5 text-sm font-normal rounded w-full"
								onClick={applyFilters}>
								Apply Filters
							</button>
							<button
								className="bg-gray-600 text-white px-2 py-1.5 text-sm font-normal rounded w-full"
								onClick={clearFilters}>
								Clear Filters
							</button>
						</div>
					</FilterHeaderComponent>
				</div>
				{/* Search Input */}
				<div className="md:w-fit w-full">
					<input
						type="search"
						value={searchQuery}
						onChange={handleSearch}
						placeholder="Search templates by username or template name"
						className="border border-gray-500 text-gray-600 rounded-lg p-2 !outline-none font-normal text-sm px-3 pr-2 w-full min-w-80"
					/>
				</div>
			</div>

			{/* Table Div */}
			<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3">
				<table className="table-auto w-full border !border-b-0">
					<thead className="w-full bg-primary/90">
						<tr>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">ID</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">User Name</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-20">User ID</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-36">User Business Category</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">Template Name</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">Template Type</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-36">Template Language</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Category</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Status</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">Created At</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-24">Actions</td>
						</tr>
					</thead>
					{isLoading ? (
						<TableLoading text={"Loading Templates ..."} loader={<LoaderWith3Lines />} />
					) : (
						<tbody>
							{currentItems.length > 0 ? (
								currentItems.map((template, idx) => {
									const createdAt = new Date(template.created_at);

									return (
										<tr key={idx} className={`border-b`}>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">{template.id}</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{template.user.name}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{template.user.id}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{template.user.business_category_name}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{template.template_name.replaceAll("_", " ")}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize flex gap-1 mt-2.5 items-center">
												{templateTypeIcons[template.template_type]}
												{template.template_type.replace("_", " ")}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												{template.template_language}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{template.template_category}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												<Badges type={template.template_status} />
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
												{createdAt.toLocaleString("en-US", {
													day: "2-digit",
													month: "short",
													year: "numeric",
													hour: "2-digit",
													minute: "2-digit",
													hour12: true,
												})}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
												<button onClick={() => handleEditTemplate(template)}>
													<PencilIcon className="size-5 mr-3 text-primary" />
												</button>
												<button onClick={() => handleDeleteTemplate(template)}>
													<Trash2Icon className="size-5 text-red-600" />
												</button>
											</td>
										</tr>
									);
								})
							) : (
								<tr className="text-xl">
									<td
										colSpan={document.querySelectorAll("thead tr:first-child td").length || 12}
										className=" w-full border p-4">
										No Templates Found... Please try again with different filters.
									</td>
								</tr>
							)}
						</tbody>
					)}
				</table>
			</div>
			<CustomPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

			{openEditTemplateForm && (
				<EditTemplateForm
					selectedTemplate={selectedTemplate}
					onClose={() => setOpenEditTemplateForm(false)}
					fetchTemplates={fetchTemplates}
				/>
			)}
		</div>
	);
};

export default AdminTemplate;
