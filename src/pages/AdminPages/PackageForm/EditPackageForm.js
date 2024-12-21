import React from "react";

import { Form, Formik } from "formik";
import FormikInput from "../../../components/Inputs/FormikInput";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

import axios from "axios";
import { toast } from "react-toastify";

import { PackageValidations } from "../../../Validations";

const EditPackageForm = ({ selectedPackage, onClose, fetchPackages }) => {
	const handleUpdatePackage = (values) => {
		const formData = new FormData();
		formData.append("package[name]", values.name);
		formData.append("package[price]", values.price);

		const loadingToast = toast.loading("Submitting form...");
		axios
			.put(`api/v1/packages/${selectedPackage.id}`, formData)
			.then((res) => {
				toast.dismiss(loadingToast);
				toast.success(res.data.message || "Package updated successfully");
				onClose();
				fetchPackages();
			})
			.catch((err) => {
				console.log(err);
				toast.dismiss(loadingToast);
				toast.error(err.response.data.message || "Error updating package");
			});
	};

    console.log(selectedPackage)

	return (
		<FormHeaderComponent headerText={"Update Package"} onClose={onClose}>
			<Formik
				initialValues={{
					name: selectedPackage?.name || "",
					price: selectedPackage?.price || "",
				}}
				onSubmit={(values) => {
					handleUpdatePackage(values);
				}}
				enableReinitialize
				validationSchema={PackageValidations}>
				{({ errors, values }) => (
					<Form className="w-full flex flex-col items-center justify-center gap-4">
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikInput
								label="Name"
								name="name"
								type="text"
                                value={values.name || ""}
								placeholder={"Enter Package Name"}
								labelClassName={"block mb-2 text-sm text-gray-700 peer-focus:text-primary"}
								className={"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"}
							/>
							<FormikInput
								label="Price"
								name="price"
								type="text"
                                value={values.price || ""}
								placeholder={"Enter Package Price"}
								labelClassName={"block mb-2 text-sm text-gray-700 peer-focus:text-primary"}
								className={"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"}
							/>
						</div>
						<button
							type="submit"
							className="px-3 py-2 bg-primary text-white rounded-lg">
							Update Package
						</button>
					</Form>
				)}
			</Formik>
		</FormHeaderComponent>
	);
};

export default EditPackageForm;
