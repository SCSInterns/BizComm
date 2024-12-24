/** @format */

import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/AdminComponents/CustomPagination";
import { FileTextIcon, ImageIcon, LayoutTemplateIcon, PencilIcon, Trash2Icon, VideoIcon } from "lucide-react";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";
import TableLoading from "../../components/TableLoading";
import usePagination from "../../components/AdminComponents/usePagination";
import { toast } from "react-toastify";
import axios from "axios";
import Badges from "../../components/AdminComponents/Badges";
import EditTemplateForm from "./TemplateForm/EditTemplateForm";

const AdminTemplate = () => {
	const [templateData, setTemplateData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);

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

	const templateTypeIcons = {
		image: <ImageIcon className="size-4" />,
		video: <VideoIcon className="size-4" />,
		document: <FileTextIcon className="size-4" />,
	};

	return (
		<div>
			{/* Header Div Table */}
			<div className="w-full flex flex-col items-end justify-between gap-2 my-2 !select-none">
				<div className="w-full flex items-center justify-between gap-4">
					<div className="flex items-center justify-center gap-2">
						<LayoutTemplateIcon className="text-primary size-8" />
						<h1 className="text-3xl text-primary">Templates</h1>
					</div>
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
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-28">Template Name</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">Template Type</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-36">Template Language</td>
							<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-40">Template Category</td>
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
												{template.template_name}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize flex gap-1 mt-2.5 items-center">
												{templateTypeIcons[template.template_type]}
												{template.template_type.replace("_", " ")}
											</td>
											<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
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
										No Users Found
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
