import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./rightaddconform.css";
import { ReactComponent as FormImage } from "../../image/formimg.svg";
import { ReactComponent as AddIcon } from "../../image/addcon.svg";
import TextInput from "../../components/Inputs/TextInput";
import TextareaInput from "../../components/Inputs/TextareaInput";
import SelectInput from "../../components/Inputs/SelectInput";
import RadioInput from "../../components/Inputs/RadioInput";

const RightAddconForm = () => {
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState({});
	const [formData, setFormData] = useState({});

	useEffect(() => {
		axios
			.get("/api/v1/current_user_client_form")
			.then((res) => {
				if (res.data.form.additional_fields) {
					const initialFormData = {
						name: "",
						mobile_number: "",
						email: "",
					};
					Object.entries(res.data.form.additional_fields).map(
						(entry) => {
							console.log(entry[0])
							initialFormData[entry[0]] = "";
						}
					);
					setFormData(initialFormData);
					setFormFields(res.data.form.additional_fields);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Emne pucho raate valo ramvani che ??

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fmData = new FormData();
		fmData.append("client[name]", formData.name);
		fmData.append("client[mobile_number]", formData.mobile_number);
		fmData.append("client[email]", formData.email);
		fmData.append("client[user_id]", localStorage.getItem("user_id"));
		Object.entries(formFields).map((entry) => {
			let key = entry[0];
			fmData.append(`client[additional_fields][${key}]`, formData[key]);
		});

		try {
			if (formData._id) {
				await axios.put(`/api/v1/clients/${formData._id}`, fmData);
			} else {
				await axios.post("/api/v1/clients", fmData);
			}
			navigate("/contact");
		} catch (error) {
			console.error("Error saving contact:", error.response.data.errors);
			error.response.data.errors.map((error) => {
				toast.error(error);
			});
			// toast.error("Error saving contact : ", error.response.data.errors[0]);
		}
	};

	return (
		<div className="w-full h-full flex items-center justify-center">
			{formFields ? (
				<div className="w-full flex lg:flex-row flex-col gap-6 mt-4">
					<div className="w-2/5 px-4">
						<form
							onSubmit={handleSubmit}
							className="w-full flex flex-col gap-4">
							<div className="form-group w-full">
								<label
									htmlFor="name"
									className="contactsName w-full mb-1">
									Contact Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Name"
									className="!w-full"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="form-group w-full">
								<label
									htmlFor="phone"
									className="PhoneNumber w-full mb-1">
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="mobile_number"
									placeholder="Phone Number"
									value={formData.phone}
									className="!w-full"
									onChange={handleChange}
									required
								/>
							</div>
							<div className="form-group w-full">
								<label
									htmlFor="email"
									className="Emailaddress w-full mb-1">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Email Address"
									value={formData.email}
									onChange={handleChange}
									className="!w-full"
									required
								/>
							</div>
							{Object.entries(formFields).map((entry) => {
								let key = entry[0];
								let value = entry[1];
								switch (value.type) {
									case "textarea":
										return (
											<TextareaInput
												key={key}
												label={key}
												name={key}
												value={formData[key]}
												onChange={handleChange}
												required={true}
											/>
										);
									case "select":
										return (
											<SelectInput
												key={key}
												label={key}
												name={key}
												value={formData[key] || ""}
												onChange={handleChange}
												options={value.options}
											/>
										);
									case "radio":
										return (
											<RadioInput
												key={key}
												label={key}
												name={key}
												value={formData[key]}
												onChange={handleChange}
												options={value.options}
											/>
										);
									default:
										return (
											<TextInput
												type={value.type}
												key={key}
												label={key}
												name={key}
												value={formData[key]}
												onChange={handleChange}
												required={true}
											/>
										);
								}
							})}
							<button
								type="submit"
								className="bg-primary text-white px-4 py-2 rounded-lg w-full">
								{formData._id ? "Update" : "Submit"}
							</button>
						</form>
					</div>
					<div className="w-3/5 flex justify-center items-center">
						<FormImage className="max-w-[600px] w-fit h-auto" />
					</div>
				</div>
			) : (
				<div className="w-full h-full min-h-80 bg-primary/20 border-2 border-dashed border-primary rounded-lg px-6 py-10 flex flex-col justify-center items-center gap-3">
					<h2 className="text-4xl font-bold text-primary">No Client Form Found</h2>
					<p className="text-base font-normal text-primary">Please create a client form first.</p>
					<Link to="/client-form" className="bg-primary text-white flex items-center gap-2 text-sm font-normal px-3.5 py-2 rounded-lg">
						<AddIcon className="w-5 h-5" />
						Add Client Form
					</Link>
				</div>
			)}
		</div>
	);
};

export default RightAddconForm;
