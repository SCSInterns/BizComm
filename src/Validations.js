/** @format */

import * as Yup from "yup";

const BusinessCategoryValidations = Yup.object().shape({
	name: Yup.string().required("Category Name is required"),
});

const LoginValidations = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long"),
});

const PackageValidations = Yup.object().shape({
	name: Yup.string().required("Package Name is required"),
	price: Yup.string().required("Price is required"),
});

const AddUserValidations = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long"),
	mobile_number: Yup.string()
		.required("Mobile Number is required")
		.min(10, "Mobile Number should be at least 10 characters long"),
	business_category_id: Yup.number().required("Business Category is required"),
	package_id: Yup.number().required("Package is required"),
	address: Yup.string().required("Address is required").min(10, "Address should be at least 10 characters long"),
});

const EditUserValidations = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	mobile_number: Yup.string()
		.required("Mobile Number is required")
		.min(10, "Mobile Number should be at least 10 characters long"),
	business_category_id: Yup.number().required("Business Category is required"),
	package_id: Yup.number().required("Package is required"),
	address: Yup.string().required("Address is required").min(10, "Address should be at least 10 characters long"),
	approval_status: Yup.string().required("Approval Status is required"),
	role: Yup.string().required("Role is required"),
});

const TemplateValidations = Yup.object().shape({
	template_name: Yup.string().required("Template Name is required"),
	template_type: Yup.string().required("Template Type is required"),
	template_language: Yup.string().required("Template Language is required"),
	body: Yup.string().required("Template Body is required"),

	// template_header: Yup.string()
	// 	.oneOf(["none", "text", "image", "video", "document"], "Invalid header type")
	// 	.required("Header is required"),

	// header_text: Yup.string().when("template_header", {
	// 	is: (value) => value && value !== "none",
	// 	then: Yup.string().required("Header content is required"),
	// 	otherwise: Yup.string().notRequired(),
	// }),

	// "buttons.body": Yup.object().when("buttons.value", {
	// 	is: "phone_number",
	// 	then: Yup.object().shape({
	// 		cc: Yup.string().matches(/^\d+$/, "Country code must be a number").required("Country code is required"),
	// 		phone_number: Yup.string().matches(/^\d+$/, "Phone number must be a number").required("Phone number is required"),
	// 	}),
	// 	otherwise: Yup.object().when("buttons.value", {
	// 		is: "url",
	// 		then: Yup.object().shape({
	// 			website_url: Yup.string().url("Invalid URL format").required("Website URL is required"),
	// 		}),
	// 		otherwise: Yup.object().notRequired(),
	// 	}),
	// }),
});

export {
	BusinessCategoryValidations,
	LoginValidations,
	AddUserValidations,
	EditUserValidations,
	PackageValidations,
	TemplateValidations,
};
