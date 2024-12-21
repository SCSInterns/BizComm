import React, { useState } from "react";

import { DeleteRounded } from "@mui/icons-material";
import { PlusIcon, Trash2Icon } from "lucide-react";

import axios from "axios";
import { toast } from "react-toastify";

import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

const AdminAddClientForm = ({ onClose, fetchClients, users }) => {
	const [fields, setFields] = useState([]);
	const [formId, setFormId] = useState(null);

	const handleAddField = () => {
		setFields([...fields, { name: "", type: "", options: [""] }]);
	};

	const handleFieldChange = (index, field, value) => {
		const updatedFields = fields.map((f, i) =>
			i === index
				? {
						...f,
						[field]: value,
						...(field === "type" && isOptionType(value)
							? { options: [] }
							: {}),
				  }
				: f
		);
		setFields(updatedFields);
	};

	const handleOptionChange = (fieldIndex, optionIndex, value) => {
		const updatedFields = fields.map((field, idx) => {
			if (idx === fieldIndex) {
				const updatedOptions = field.options.map((option, i) =>
					i === optionIndex ? value : option
				);
				return { ...field, options: updatedOptions };
			}
			return field;
		});
		setFields(updatedFields);
	};

	const handleAddOption = (fieldIndex) => {
		const updatedFields = fields.map((field, i) => {
			if (i === fieldIndex) {
				return { ...field, options: [...field.options, ""] };
			}
			return field;
		});
		setFields(updatedFields);
	};

	const handleOptionDelete = (fieldIndex, optionIndex) => {
		const updatedFields = fields.map((field, index) => {
			if (index === fieldIndex) {
				return {
					...field,
					options: field.options.filter((_, i) => i !== optionIndex),
				};
			}
			return field;
		});
		setFields(updatedFields);
	};

	const isOptionType = (type) =>
		["select", "radio", "checkbox"].includes(type);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (fields.length === 0) {
			toast.error("Please add at least one field.");
			return;
		}
		if (fields.some((field) => field.name === "")) {
			toast.error("Field name cannot be empty.");
			return;
		}
		if (fields.some((field) => field.type === "")) {
			toast.error("Field type cannot be empty.");
			return;
		}
		if (
			fields.some(
				(field) =>
					isOptionType(field.type) && field.options.length === 0
			)
		) {
			toast.error("Please add at least one option.");
			return;
		}
		if (
			fields.some(
				(field) =>
					isOptionType(field.type) &&
					field.options.some((option) => option === "")
			)
		) {
			toast.error("Option name cannot be empty.");
			return;
		}

		const formattedFields = fields.reduce((acc, field) => {
			acc[field.name] = {
				type: field.type,
				...(field.options?.length > 0
					? { options: field.options }
					: {}),
			};
			return acc;
		}, {});

		const formData = new FormData();
		formData.append(
			"form[additional_fields]",
			JSON.stringify(formattedFields)
		);

		axios
			.put(`/api/v1/client_forms/${formId}`, formData)
			.then((res) => {
				toast.success(
					res.data.message || "Client form created successfully."
				);
				onClose();
				fetchClients();
			})
			.catch((err) => {
				console.log(err);
				toast.error(
					err.message ||
						"Something went wrong while creating client form."
				);
			});
	};

	return (
		<FormHeaderComponent headerText={"Add Client Form"} onClose={onClose}>
			<div className="w-full flex sm:flex-row flex-col sm:items-center justify-between sm:gap-4 gap-2 pr-1">
				<div>
					<label
						htmlFor="client_form_user_id"
						className="font-semibold mr-2 select-none">
						Select User
					</label>
					<select
						name="client_form_user_id"
						id="client_form_user_id"
						className="font-normal !outline-none text-sm border border-black rounded-lg p-2"
						onChange={(e) => setFormId(e.target.value)}>
						{users
							?.filter(
								(user) => user?.additional_fields?.length <= 0
							)
							.map((user, idx) => (
								<option key={idx} value={user.id}>
									{user.user.name}
								</option>
							))}
					</select>
				</div>
				<button
					type="button"
					className="flex items-center justify-center gap-1 text-primary bg-primary/10 font-semibold border-2 border-dashed border-primary rounded-lg px-3 text-sm py-2"
					onClick={handleAddField}>
					<PlusIcon size={16} /> Add Field
				</button>
			</div>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 h-full w-full mt-2">
				<div className="w-full h-full max-h-80 overflow-y-scroll custom-scrollbar space-y-4">
					{fields.map((field, index) => (
						<div
							key={index}
							className="border p-3 pt-2.5 rounded-lg bg-gray-50">
							<div className="w-full flex justify-between items-center gap-2 mb-1">
								<h2 className="font-medium pl-0.5 text-gray-700">
									Field {index + 1}
								</h2>
								<button
									type="button"
									onClick={() =>
										setFields(
											fields.filter((_, i) => i !== index)
										)
									}
									className="p-1.5 rounded">
									<Trash2Icon className="text-red-500 size-4" />
								</button>
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex sm:flex-row flex-col w-full sm:gap-0 gap-2 sm:space-x-4">
									<input
										type="text"
										placeholder="Field Name"
										className="bg-white border !outline-none font-normal text-sm px-3 py-2 rounded w-full"
										value={field.name}
										onChange={(e) =>
											handleFieldChange(
												index,
												"name",
												e.target.value
											)
										}
									/>
									<div className="w-full flex items-center space-x-2">
										<select
											value={field.type}
											className="bg-white border !outline-none font-normal text-sm px-3 py-2 rounded w-full"
											onChange={(e) =>
												handleFieldChange(
													index,
													"type",
													e.target.value
												)
											}>
											<option value="">
												Select Type
											</option>
											<option value="text">Text</option>
											<option value="date">Date</option>
											<option value="number">
												Number
											</option>
											<option value="email">Email</option>
											<option value="time">Time</option>
											<option value="select">
												Select
											</option>
											<option value="checkbox">
												Checkbox
											</option>
										</select>
										{isOptionType(field.type) && (
											<button
												type="button"
												className="bg-primary w-fit flex items-center justify-center gap-1 text-white font-normal text-sm px-3 py-2 rounded"
												onClick={() =>
													handleAddOption(index)
												}>
												<PlusIcon className="size-4" />
											</button>
										)}
									</div>
								</div>
							</div>
							{isOptionType(field.type) && (
								<div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 items-center space-2">
									{field.options.map(
										(option, optionIndex) => (
											<div
												key={optionIndex}
												className="flex items-center space-x-2">
												<input
													type="text"
													placeholder={`Option ${
														optionIndex + 1
													}`}
													className="border font-normal text-sm !outline-none px-2.5 py-1 rounded w-full"
													value={option}
													onChange={(e) =>
														handleOptionChange(
															index,
															optionIndex,
															e.target.value
														)
													}
												/>
												<button
													type="button"
													onClick={() =>
														handleOptionDelete(
															index,
															optionIndex
														)
													}>
													<DeleteRounded className="text-red-600 !size-5" />
												</button>
											</div>
										)
									)}
								</div>
							)}
						</div>
					))}
				</div>
				{fields.length === 0 && (
					<div className="text-xl text-center font-semibold border-2 border-primary border-dashed text-primary bg-primary/20 h-auto min-h-40 p-6 px-8 flex items-center justify-center rounded-lg">
						No fields added yet. Click on the "+ Add Field" button
						to add a field.
					</div>
				)}
				<button
					type="submit"
					disabled={fields.length === 0}
					className={`bg-primary font-semibold text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed`}>
					Submit
				</button>
			</form>
		</FormHeaderComponent>
	);
};

export default AdminAddClientForm;
