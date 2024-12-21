import * as Yup from "yup";

const BusinessCategoryValidations = Yup.object().shape({
    name: Yup.string().required("Category Name is required")
})

const LoginValidations = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long"),
})

const PackageValidations = Yup.object().shape({
    name: Yup.string().required("Package Name is required"),
    price: Yup.string().required("Price is required"),
})

const AddUserValidations = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password should be at least 8 characters long"),
    mobile_number: Yup.string().required("Mobile Number is required").min(10, "Mobile Number should be at least 10 characters long"),
    business_category_id: Yup.number().required("Business Category is required"),
    package_id: Yup.number().required("Package is required"),
    address: Yup.string().required("Address is required").min(10, "Address should be at least 10 characters long"),
})

const EditUserValidations = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile_number: Yup.string().required("Mobile Number is required").min(10, "Mobile Number should be at least 10 characters long"),
    business_category_id: Yup.number().required("Business Category is required"),
    package_id: Yup.number().required("Package is required"),
    address: Yup.string().required("Address is required").min(10, "Address should be at least 10 characters long"),
    approval_status: Yup.string().required("Approval Status is required"),
    role: Yup.string().required("Role is required"),
})

const TemplateValidations = Yup.object().shape({
    template_name: Yup.string().required("Template Name is required"),
    template_type: Yup.string().required("Template Type is required"),
    template_category: Yup.string().required("Template Category is required"),
    template_language: Yup.string().required("Template Language is required"),
    body: Yup.string().required("Template Body is required"),
    // user_id: Yup.number().required("User is required"),
})

export {
    BusinessCategoryValidations,
    LoginValidations,
    AddUserValidations,
    EditUserValidations,
    PackageValidations,
    TemplateValidations,
}