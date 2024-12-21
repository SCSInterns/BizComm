import React, { useEffect, useState } from "react";
import FormikInput from "../../../components/Inputs/FormikInput";
import { Form, Formik } from "formik";
import { EditUserValidations } from "../../../Validations";
import axios from "axios";
import { toast } from "react-toastify";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";
import FormikTextarea from "../../../components/Inputs/FormikTextarea";
import FormikSelect from "../../../components/Inputs/FormikSelect";

const EditUserForm = ({ selectedUser, onClose, fetchUsers }) => {
	const [businessCategories, setBusinessCategories] = useState([]);
	const [packages, setPackages] = useState([]);

	useEffect(() => {
		axios
			.get("api/v1/business_categories")
			.then((res) => {
				setBusinessCategories(res.data.business_categories);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get("api/v1/packages")
			.then((res) => {
				setPackages(res.data.packages);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleUpdateUser = (values) => {
		const formData = new FormData();
		formData.append("user[name]", values.name);
		formData.append("user[email]", values.email);
		formData.append("user[mobile_number]", values.mobile_number);
		formData.append(
			"user[business_category_id]",
			values.business_category_id
		);
		formData.append("user[package_id]", values.package_id);
		formData.append("user[address]", values.address);
		formData.append("user[approval_status]", values.approval_status.toLowerCase());
		formData.append("user[role]", values.role);
		console.log(values);

		const loadingToast = toast.loading("Submitting form...");
		axios
			.put(`api/v1/users/${selectedUser.id}`, formData)
			.then((res) => {
				toast.dismiss(loadingToast);
				toast.success(res.data.message || "User updated successfully");
				onClose();
				fetchUsers();
			})
			.catch((err) => {
				console.log(err);
				toast.dismiss(loadingToast);
				toast.error(err?.response?.data?.message || "Error updating user");
			});
	};

	return (
		<FormHeaderComponent headerText={"Update User"} onClose={onClose}>
			<Formik
				initialValues={{
					name: selectedUser?.name || "",
					email: selectedUser?.email || "",
					mobile_number: selectedUser?.mobile_number || "",
					business_category_id:
						selectedUser?.business_category_id || "",
					package_id: selectedUser?.package_id || "",
					address: selectedUser?.address || "",
					approval_status: selectedUser?.approval_status || "",
					role: selectedUser?.role || "",
				}}
				onSubmit={(values) => {
					handleUpdateUser(values);
				}}
				enableReinitialize
				validationSchema={EditUserValidations}>
				{({ errors, values }) => (
					<Form className="w-full flex flex-col items-center justify-center gap-4">
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikInput
								label="Name"
								name="name"
								type="text"
								value={values?.name}
								placeholder={"Enter User Name"}
								labelClassName={
									`block mb-2 text-sm ${errors.name ? "text-red-500" : "text-gray-700"} peer-focus:text-primary`
								}
								className={
									`block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40`
								}
							/>
							<FormikInput
								label="Mobile Number"
								name="mobile_number"
								type="text"
								length={10}
								value={values?.mobile_number}
								placeholder={"Enter Mobile Number"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
						</div>
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikInput
								label="Email"
								name="email"
								type="email"
								value={values?.email}
								placeholder={"Enter Email"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-3 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
							<FormikSelect
								label="Role"
								name="role"
								optionData={[
									{ name: "Admin" },
									{ name: "Vendor" },
								]}
								valueProperty={"name"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-2 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
						</div>
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikSelect
								label="Business Category"
								name="business_category_id"
								optionData={businessCategories}
								valueProperty={"id"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-2 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
							<FormikSelect
								label="Package"
								name="package_id"
								optionData={packages}
								valueProperty={"id"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-2 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
						</div>
						<div className="w-full">
							<FormikSelect
								label="Approval Status"
								name="approval_status"
								optionData={[
									{ name: "Pending" },
									{ name: "Approved" },
									{ name: "Rejected" },
								]}
								valueProperty={"name"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary !-top-7"
								}
								className={
									"block w-full px-2 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
						</div>
						<div className="w-full">
							<FormikTextarea
								label="Address"
								name="address"
								placeholder={"Enter Address"}
								labelClassName={
									"block mb-2 text-sm text-gray-700 peer-focus:text-primary"
								}
								className={
									"block w-full px-2 py-2 min-h-20 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-400 !peer rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
								}
							/>
						</div>
						<button
							type="submit"
							className="px-3 py-2 bg-primary text-white rounded-lg">
							Update User
						</button>
					</Form>
				)}
			</Formik>
		</FormHeaderComponent>
	);
};

export default EditUserForm;
