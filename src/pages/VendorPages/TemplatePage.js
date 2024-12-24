/** @format */

import React, { useEffect, useState } from "react";
import {
	EyeIcon,
	FileTextIcon,
	FilterIcon,
	ImageIcon,
	LayoutTemplateIcon,
	PencilIcon,
	PlusIcon,
	Trash2Icon,
	VideoIcon,
	XIcon,
} from "lucide-react";
import CustomTooltip from "../../components/AdminComponents/CustomTooltip";
import CustomPagination from "../../components/AdminComponents/CustomPagination";
import TableLoading from "../../components/TableLoading";
import LoaderWith3Lines from "../../components/Loaders/LoaderWith3Lines";
import usePagination from "../../components/AdminComponents/usePagination";
import AddTemplateForm from "./TemplateForm/AddTemplateForm";
import axios from "axios";
import { toast } from "react-toastify";
import EditTemplateForm from "./TemplateForm/EditTemplateForm";
import Badges from "../../components/AdminComponents/Badges";

const TemplatePage = () => {
	// const [templateData, setTemplateData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filters, setFilters] = useState([]);

	const [openAddTemplateForm, setOpenAddTemplateForm] = useState(false);
	const [openEditTemplateForm, setOpenEditTemplateForm] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	const fetchTemplates = async () => {
		await axios
			.get("/api/v1/user_templates")
			.then(response => {
				// setTemplateData(response.data.data);
				setFilteredData(response.data.user_templates);
			})
			.catch(error => {
				toast.error(error?.response?.data?.message || error.message || "Error while fetching templates");
			});
	};

	useEffect(() => {
		fetchTemplates();
	}, []);

	const handleDeleteTemplate = template => {
		if (template) {
			axios
				.delete(`/api/v1/user_templates/${template.id}`)
				.then(res => {
					toast.success(res.data.message || "Template deleted successfully");
					fetchTemplates();
				})
				.catch(error => {
					console.log(error);
					toast.error(error.response.data.message || error.message || "Error while deleting template");
				});
		}
	};

	const handleViewMedia = media => {
		if (media) {
			window.open(media, "_blank");
		}
	};

	// Pagination Components
	const { currentItems, currentPage, handlePageChange, totalPages } = usePagination(filteredData, 10);

	const templateTypeIcons = {
		image: <ImageIcon className="size-4" />,
		video: <VideoIcon className="size-4" />,
		document: <FileTextIcon className="size-4" />,
	};

	return (
		<div className="w-full h-full min-h-[calc(100vh-3rem)] pl-4 mt-3 relative">
			<div className="w-full flex flex-col items-center justify-center md:gap-6 gap-4">
				{/* Header Div */}
				<div className="w-full flex md:flex-row flex-col items-center justify-between gap-4">
					<div className="h-full flex items-center justify-center gap-2">
						<LayoutTemplateIcon className="size-7" />
						<h1 className="text-3xl">Templates</h1>
					</div>
					<div className="h-full flex items-center justify-center gap-2">
						<div className="relative group/add-template">
							<div
								onClick={() => setOpenAddTemplateForm(true)}
								className="p-2 pr-[18px] relative bg-primary rounded-lg cursor-pointer text-white flex items-center justify-center select-none">
								<LayoutTemplateIcon size={20} />
								<PlusIcon size={13} className="absolute right-[5.5px] top-3" />
							</div>
							<CustomTooltip
								text={"Add Template"}
								position={"left"}
								classes={"scale-0 group-hover/add-template:scale-100"}
							/>
						</div>
					</div>
				</div>
				{/* Filter Div */}
				<div className="w-full flex items-center justify-start gap-5 select-none -mb-3">
					<div className="flex items-center justify-center gap-2 relative">
						<div className="w-full min-w-80 h-10 rounded-lg flex items-center justify-start gap-2 px-2 border border-gray-700 font-normal text-sm text-gray-400">
							{filters.length > 0 ? (
								filters.map((filter, idx) => {
									return (
										<div
											key={idx}
											onClick={() => {
												setFilters(prev => prev.filter(f => f !== filter));
											}}
											className="flex items-center justify-center gap-1.5 text-black border border-gray-600 rounded-full p-2 py-1 cursor-pointer group/filter-btn hover:bg-red-50 hover:border-red-600">
											<span className="capitalize font-normal text-xs group-hover/filter-btn:text-red-600">
												{filter}
											</span>
											<button
												className="group-hover/filter-btn:text-red-600"
												onClick={() => {
													setFilters(prev => prev.filter(f => f !== filter));
												}}>
												<XIcon className="size-3" />
											</button>
										</div>
									);
								})
							) : (
								<p className="px-1">Filters</p>
							)}
						</div>
						<button>
							{isFilterOpen ? (
								<XIcon className="size-5" onClick={() => setIsFilterOpen(false)} />
							) : (
								<FilterIcon className="size-5" onClick={() => setIsFilterOpen(true)} />
							)}
						</button>
						{/* Filter Div */}
						<div
							className={` ${
								isFilterOpen ? "scale-y-full" : "scale-y-0"
							}  w-full absolute top-12 left-0 flex flex-col items-center justify-center gap-2 z-50 bg-white rounded-lg shadow-xl border border-gray-300 p-2`}>
							{filters.length !== 4 ? (
								<>
									<button
										onClick={() => {
											setFilters(prev => {
												return [...prev, "image"];
											});
										}}
										type="button"
										className={`${
											filters.includes("image") ? "hidden" : "flex"
										} hover:bg-primary/20 hover:border-primary font-normal text-sm items-center justify-start w-full border p-2 rounded`}>
										<div
											className={`size-5 rounded-full border border-gray-700 relative before:absolute before:size-3 before:top-[3.5px] before:left-[3px] before:bg-primary before:rounded-full mr-2`}
										/>
										<ImageIcon className="size-4 text-gray-700 mr-1" />
										Image
									</button>
									<button
										onClick={() => {
											setFilters(prev => {
												return [...prev, "video"];
											});
										}}
										type="button"
										className={`${
											filters.includes("video") ? "hidden" : "flex"
										} hover:bg-primary/20 hover:border-primary font-normal text-sm items-center justify-start w-full border p-2 rounded`}>
										<div
											className={`size-5 rounded-full border border-gray-700 relative before:absolute before:size-3 before:top-[3.5px] before:left-[3px] before:bg-primary before:rounded-full mr-2`}
										/>
										<VideoIcon className="size-4 text-gray-700 mr-1" />
										Video
									</button>
									<button
										onClick={() => {
											setFilters(prev => {
												return [...prev, "pdf"];
											});
										}}
										type="button"
										className={`${
											filters.includes("pdf") ? "hidden" : "flex"
										} hover:bg-primary/20 hover:border-primary font-normal text-sm items-center justify-start w-full border p-2 rounded`}>
										<div
											className={`size-5 rounded-full border border-gray-700 relative before:absolute before:size-3 before:top-[3.5px] before:left-[3px] before:bg-primary before:rounded-full mr-2`}
										/>
										<FileTextIcon className="size-4 text-gray-700 mr-1" />
										PDF
									</button>
									<button
										onClick={() => {
											setFilters(prev => {
												return [...prev, "msg"];
											});
										}}
										type="button"
										className={`${
											filters.includes("msg") ? "hidden" : "flex"
										} hover:bg-primary/20 hover:border-primary font-normal text-sm items-center justify-start w-full border p-2 rounded`}>
										<div
											className={`size-5 rounded-full border border-gray-700 relative before:absolute before:size-3 before:top-[3.5px] before:left-[3px] before:bg-primary before:rounded-full mr-2`}
										/>
										<FileTextIcon className="size-4 text-gray-700 mr-1" />
										Messages Only
									</button>
								</>
							) : (
								<p className="w-full text-center font-normal text-sm">No more filters available</p>
							)}
						</div>
					</div>
				</div>

				{/* Table Div */}
				<div className="overflow-x-auto pb-1 custom-horizontal-scrollbar rounded-xl mb-3 w-full">
					<table className="table-auto w-full border !border-b-0">
						<thead className="w-full bg-primary/90">
							<tr>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-12">Sr No.</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Name</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Type</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Language</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-32">Template Category</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-">Template Media</td>
								<td className="p-4 text-sm font-semibold w-auto h-full text-white min-w-">Template Status</td>
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
										const created_at = new Date(template.created_at);
										return (
											<tr key={idx} className={`border-b`}>
												<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">{idx + 1}</td>
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
												<td className={`p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize ${
														template.media_url ? "cursor-pointer hover:text-primary" : "opacity-30 cursor-not-allowed"
													}`}>
													<EyeIcon onClick={() => handleViewMedia(template.media_url)} />
												</td>
												<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full capitalize">
													<Badges type={template.template_status} />
												</td>
												<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
													{created_at.toLocaleString("en-US", {
														day: "2-digit",
														month: "short",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit",
														hour12: true,
													})}
												</td>
												<td className="p-4 text-sm font-normal text-gray-700 w-fit h-full">
													<button>
														<PencilIcon
															onClick={() => {
																setSelectedTemplate(template);
																setOpenEditTemplateForm(true);
															}}
															className="size-5 mr-3 text-primary"
														/>
													</button>
													<button>
														<Trash2Icon
															onClick={() => handleDeleteTemplate(template)}
															className="size-5 text-red-600"
														/>
													</button>
												</td>
											</tr>
										);
									})
								) : (
									<tr className="text-xl">
										<td
											colSpan={document.querySelectorAll("thead tr:first-child td").length || 12}
											className="w-full border p-4">
											No Templates Found ...
										</td>
									</tr>
								)}
							</tbody>
						)}
					</table>
				</div>
				<CustomPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />

				{openAddTemplateForm && (
					<AddTemplateForm onClose={() => setOpenAddTemplateForm(false)} fetchTemplates={fetchTemplates} />
				)}

				{openEditTemplateForm && (
					<EditTemplateForm
						selectedTemplate={selectedTemplate}
						onClose={() => setOpenEditTemplateForm(false)}
						fetchTemplates={fetchTemplates}
					/>
				)}
			</div>
		</div>
	);
};

export default TemplatePage;
