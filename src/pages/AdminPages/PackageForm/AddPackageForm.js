import React from "react";

import { Form, Formik } from "formik";
import FormikInput from "../../../components/Inputs/FormikInput";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

import axios from "axios";
import { toast } from "react-toastify";

import { PackageValidations } from "../../../Validations";

const AddPackageForm = ({ onClose, fetchPackages }) => {
	const handlePackageSubmit = (values) => {
		const formData = new FormData();
		formData.append("package[name]", values.name);
		formData.append("package[price]", values.price);

		const loadingToast = toast.loading("Submitting form...");
		axios
			.post(`api/v1/packages`, formData)
			.then((res) => {
				toast.dismiss(loadingToast);
				toast.success(res.data.message || "Package added successfully");
				onClose();
				fetchPackages();
			})
			.catch((err) => {
				console.log(err);
				toast.dismiss(loadingToast);
				toast.error(
					err.response.data.message || "Error adding package"
				);
			});
	};

	return (
		<FormHeaderComponent headerText={"Add Package"} onClose={onClose}>
			<Formik
				initialValues={{
					name: "",
					price: "",
				}}
				onSubmit={(values) => {
					handlePackageSubmit(values);
				}}
				validationSchema={PackageValidations}>
				<Form className="w-full flex flex-col items-center justify-center gap-4">
					<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
						<FormikInput
							label="Name"
							name="name"
							type="text"
							placeholder={"Enter Package Name"}
							labelClassName={
								"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
							}
							className={
								"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
							}
						/>
						<FormikInput
							label="Price"
							name="price"
							type="text"
							placeholder={"Enter Package Price"}
							labelClassName={
								"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
							}
							className={
								"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
							}
						/>
					</div>
					<button
						type="submit"
						className="px-3 py-2 bg-primary text-white rounded-lg">
						Add Package
					</button>
				</Form>
			</Formik>
		</FormHeaderComponent>
	);
};

export default AddPackageForm;
