import React from "react";
import FormikInput from "../../../components/Inputs/FormikInput";
import { Form, Formik } from "formik";
import { BusinessCategoryValidations } from "../../../Validations";
import axios from "axios";
import { toast } from "react-toastify";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

const AddBusinessCategoryForm = ({ onClose, fetchCategories }) => {
	const handleBusinessCategory = (values) => {
		const formData = new FormData();
		formData.append("business_category[name]", values.name);

		const loadingToast = toast.loading("Submitting form...");
		axios
			.post(`api/v1/business_categories`, formData)
			.then((res) => {
				toast.dismiss(loadingToast);
				toast.success(
					res.data.message || "Category added successfully"
				);
				onClose();
				fetchCategories();
			})
			.catch((err) => {
				console.log(err);
				toast.dismiss(loadingToast);
				toast.error(
					err.response.data.message || "Error adding category"
				);
			});
	};

	return (
		<FormHeaderComponent
			headerText={"Add Business Category"}
			onClose={onClose}>
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={(values) => {
					handleBusinessCategory(values);
				}}
				validationSchema={BusinessCategoryValidations}>
				{({ errors }) => (
					<Form className="w-full flex flex-col items-start justify-center gap-4">
						<FormikInput
							label={"Category Name"}
							name={"name"}
							type={"text"}
							placeholder={"Enter Category Name"}
							labelClassName={`"block mb-2 text-sm ${
								errors.name ? "text-red-600" : "text-gray-700"
							} peer-focus:text-primary`}
							className={
								`block w-full px-3 py-2 mt-2 placeholder-gray-400 bg-white border ${errors.name ? "text-red-600 border-red-600" : "text-gray-700 border-gray-400"} !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40`
							}
						/>
						<button
							type="submit"
							className="px-3 py-2 bg-primary text-white rounded-lg">
							Add Category
						</button>
					</Form>
				)}
			</Formik>
		</FormHeaderComponent>
	);
};

export default AddBusinessCategoryForm;
