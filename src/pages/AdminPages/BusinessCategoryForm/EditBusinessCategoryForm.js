import React from "react";
import FormikInput from "../../../components/Inputs/FormikInput";
import { Form, Formik } from "formik";
import { BusinessCategoryValidations } from "../../../Validations";
import axios from "axios";
import { toast } from "react-toastify";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

const EditBusinessCategoryForm = ({
	selectedCategory,
	onClose,
	fetchCategories,
}) => {
	const handleBusinessCategory = (values) => {
		const formData = new FormData();
		formData.append("business_category[name]", values.name);

		const loadingToast = toast.loading("Submitting form...");
		axios
			.put(`api/v1/business_categories/${selectedCategory.id}`, formData)
			.then((res) => {
				toast.dismiss(loadingToast);
				toast.success(
					res.data.message || "Category updated successfully"
				);
				onClose();
				fetchCategories();
			})
			.catch((err) => {
				console.log(err);
				toast.dismiss(loadingToast);
				toast.error(
					err.response.data.message || "Error updating category"
				);
			});
	};

	return (
		<FormHeaderComponent
			headerText={"Update Business Category"}
			onClose={onClose}>
			<Formik
				initialValues={{
					name: selectedCategory.name || "",
				}}
				onSubmit={(values) => {
					handleBusinessCategory(values);
				}}
				validationSchema={BusinessCategoryValidations}>
				{({ values }) => (
					<Form className="w-full flex flex-col items-start justify-center gap-4">
						<FormikInput
							label="Category Name"
							name="name"
							type="text"
							placeholder={"Enter Category Name"}
							value={values.name}
							labelClassName={
								"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
							}
							className={
								"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
							}
						/>
						<button
							type="submit"
							className="px-3 py-2 bg-primary text-white rounded-lg">
							Update Category
						</button>
					</Form>
				)}
			</Formik>
		</FormHeaderComponent>
	);
};

export default EditBusinessCategoryForm;
