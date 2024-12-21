import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { DeleteRounded } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddClientForm = () => {
    const navigate = useNavigate();
	const [fields, setFields] = useState([]);

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
            toast.error("Please add at least one field.")
            return;
        }
        if (fields.some((field) => field.name === "")) {
            toast.error("Field name cannot be empty.")
            return;
        }
        if (fields.some((field) => field.type === "")) {
            toast.error("Field type cannot be empty.")
            return;
        }
        if (fields.some((field) => isOptionType(field.type) && field.options.length === 0)) {
            toast.error("Please add at least one option.")
            return;
        }
        if (fields.some((field) => isOptionType(field.type) && field.options.some((option) => option === ""))) {
            toast.error("Option name cannot be empty.")
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
		formData.append("form[user_id]", localStorage.getItem("user_id"));
		formData.append("form[additional_fields]", JSON.stringify(formattedFields));

		axios
			.post("/api/v1/client_forms", formData)
			.then((res) => {
                toast.success("Client form created successfully.")
                navigate("/contact/add-contact")
            })
			.catch((err) => {
				console.log(err);
                toast.error(err.response.data.message || "Something went wrong while creating client form.")
			});
	};

	return (
		<div className="main-contactpage">
			<Sidebar />
			<div className="w-[3px] min-h-[100dvh] h-full bg-[black] -mt-[20px] ml-[50px]"></div>
			<div className="w-full py-10 pt-6">
				<div className="w-full mb-5 flex justify-between items-center gap-4 pl-8">
					<h1 className="text-4xl font-bold">Add Client Form</h1>
					<button
						type="button"
						className="bg-primary text-white px-3 text-sm font-normal py-2 rounded"
						onClick={handleAddField}>
						+ Add Field
					</button>
				</div>
                <div className="w-full h-0.5 my-6 bg-black" />
				<form onSubmit={handleSubmit} className="space-y-4 pl-8">
					{fields.map((field, index) => (
						<div
							key={index}
							className="border p-4 pt-3 rounded-lg shadow">
							<div className="w-full flex justify-between items-center gap-3 mb-2">
								<h2 className="text-lg font-bold pl-0.5 text-primary">
									Field {index + 1}
								</h2>
								<button
									onClick={() =>
										setFields(
											fields.filter((_, i) => i !== index)
										)
									}
									className="bg-red-600 pt-0.5 pb-1 px-1 rounded">
									<DeleteRounded className="!size-5 text-white" />
								</button>
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex w-full space-x-4">
									<input
										type="text"
										placeholder="Field Name"
										className="bg-[#F0F0F0] !outline-none font-semibold text-sm px-4 py-2 rounded w-full"
										value={field.name}
										onChange={(e) =>
											handleFieldChange(
												index,
												"name",
												e.target.value
											)
										}
									/>
									<select
										value={field.type}
										className="bg-[#F0F0F0] !outline-none font-normal text-sm px-3 py-2 rounded w-full"
										onChange={(e) =>
											handleFieldChange(
												index,
												"type",
												e.target.value
											)
										}>
										<option value="">Select Type</option>
										<option value="text">Text</option>
										<option value="number">Number</option>
										<option value="email">Email</option>
										<option value="select">Select</option>
										<option value="radio">Radio</option>
										<option value="checkbox">
											Checkbox
										</option>
									</select>
									{isOptionType(field.type) && (
										<button
											type="button"
											className="bg-primary w-52 text-white font-normal text-sm px-3 py-2 rounded"
											onClick={() =>
												handleAddOption(index)
											}>
											Add Option
										</button>
									)}
								</div>
							</div>
							{isOptionType(field.type) && (
								<div className="mt-4 grid grid-cols-4 gap-4 items-center space-2">
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
					{fields.length === 0 && (
						<div className="text-xl font-semibold border-2 border-primary border-dashed text-primary bg-primary/20 h-auto min-h-40 p-6 px-8 flex items-center justify-center rounded-lg">
							No fields added yet. Click on the "+" button to add
							a field.
						</div>
					)}
					<button
						type="submit"
						className="bg-primary font-semibold text-white px-4 py-2 rounded">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddClientForm;
