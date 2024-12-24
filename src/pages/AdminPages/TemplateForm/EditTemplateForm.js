/** @format */

import React from "react";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";
import { Form, Formik } from "formik";
import FormikSelect from "../../../components/Inputs/FormikSelect";
import axios from "axios";
import { toast } from "react-toastify";

const EditTemplateForm = ({ selectedTemplate, onClose, fetchTemplates }) => {
	const handleTempTypeChange = (e, setFieldValue) => {
		setFieldValue("template_status", e.target.value);
	};

    const handleSubmit = values => {
        const formData = new FormData();
        formData.append("user_template[template_status]", values.template_status);
        
        axios.put(`api/v1/user_templates/${selectedTemplate.id}`, formData)
        .then(_ => {
            toast.success("Template status updated successfully")
            onClose();
            fetchTemplates();
        })
    }

	return (
		<FormHeaderComponent headerText="Edit Template" onClose={onClose} className={"!max-w-[20rem]"}>
			<Formik
				initialValues={{
					template_status: selectedTemplate.template_status || "",
				}}
                enableReinitialize
                onSubmit={(values) => handleSubmit(values)}
                >
				{({ setFieldValue, values }) => (
					<Form>
						<FormikSelect
							name={"template_status"}
							label={"Template Status"}
							optionData={[
								{ value: "pending", label: "Pending" },
								{ value: "approved", label: "Approved" },
								{ value: "rejected", label: "Rejected" },
							]}
							onChange={e => handleTempTypeChange(e, setFieldValue)}
							valueProperty="value"
							labelProperty="label"
							value={values.template_status}
							selectedOption={"Select template Status"}
							labelClassName={`md:text-base text-sm peer-focus:text-primary`}
							className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
						/>
						<button className="bg-primary text-white font-normal text-sm px-3 py-2 rounded-lg mt-3">Submit</button>
					</Form>
				)}
			</Formik>
		</FormHeaderComponent>
	);
};

export default EditTemplateForm;
