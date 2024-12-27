/** @format */

import React, { useState } from "react";

import { Form, Formik } from "formik";
import FormikInput from "../../../components/Inputs/FormikInput";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

import { TemplateValidations } from "../../../Validations";
import FormikSelect from "../../../components/Inputs/FormikSelect";
import { CirclePlayIcon, FileTextIcon, InfoIcon, PlusIcon, TriangleRightIcon } from "lucide-react";
import FormikTextarea from "../../../components/Inputs/FormikTextarea";

// import whatsappBG from "../../../image/whatsapp-bg.jpg";
import whatsappBG from "../../../image/whatsapp-bg.png";
import axios from "axios";
import { toast } from "react-toastify";

const AddTemplateForm = ({ className }) => {
	const [openCategoryInfo, setOpenCategoryInfo] = useState(false);
	const [bodyVariables, setBodyVariables] = useState([]);
	const [headerText, setHeaderText] = useState("");
	const [buttons, setButtons] = useState({});
	const [body, setBody] = useState("Hello");
	const [templateType, setTemplateType] = useState("none");

	// FUnction to add variable to body
	const addBodyVariable = ({ setFieldValue }) => {
		const textEditor = document.getElementById("body");
		const { selectionStart, selectionEnd, value } = textEditor;
		const newVar = `{{variable-${bodyVariables.length + 1}}} `;

		const updatedText = value.substring(0, selectionStart) + newVar.toString() + value.substring(selectionEnd);

		textEditor.focus();
		setFieldValue("body", updatedText);
		setBody(updatedText);
		setBodyVariables([...bodyVariables, newVar]);
	};

	// Handle body change and set variables
	const handleBodyChange = (e, setFieldError, setFieldValue) => {
		const newValue = e?.target?.value;

		setFieldValue("body", newValue);
		setBody(newValue);

		const regex = /\{\{.+?\}\}/g;
		const currentVariables = newValue.match(regex) || [];
		setBodyVariables(currentVariables);

		const totalWords = newValue.trim().split(/\s+/).length;
		const nonVariableWords = totalWords - currentVariables.length;
		const requiredNonVariableWords = 2 * currentVariables.length + 1;

		if (requiredNonVariableWords > nonVariableWords) {
			setFieldError("body", `Please include at least ${requiredNonVariableWords} non-variable words.`);
		}
	};

	const transformDoubleAsterisksAndUnderscores = text => {
		if (!text || typeof text !== "string") return text;

		const regex = /(\*\*(.*?)\*\*|__(.*?)__)/g;
		return text.replace(regex, (match, boldContent, italicContent) => {
			if (boldContent) {
				return `<strong>${boldContent.slice(2, -2)}</strong>`;
			}
			if (italicContent) {
				return `<em>${italicContent.slice(2, -2)}</em>`;
			}
			return match;
		});
	};

	const handleFormSubmit = values => {
		const formData = new FormData();
		const contentVariables = bodyVariables.map(variable => variable.replace(/\{\{|\}\}/g, ""));

		const payload = {
			name: values.template_name,
			language: values.template_language,
			category: values.template_category,
			subcategory: values.template_subcategory,
			components: [],
		};

		if (templateType && templateType !== "none") {
			payload.components.push({
				type: "HEADER",
				format: templateType.toUpperCase(),
				text: headerText,
			});
		}

		payload.components.push({
			type: "BODY",
			text: transformDoubleAsterisksAndUnderscores(values.body),
		});

		if (values.buttons.value !== "") {
			payload.components.push({
				type: "BUTTONS",
				subtype: values.buttons.value,
				parameters: [
					{
						type: "text",
						text: values.buttons.value === "url" ? "Visit Website" : "Call Us",
					},
					values.buttons.value === "url"
						? {
								type: values.buttons.value,
								url: values.buttons.body.website_url,
						  }
						: {
								type: values.buttons.value,
								phone_number: "+" + values.buttons.body.cc + values.buttons.body.phone_number,
						  },
				],
			});
		}

		console.log(values);
		console.log(payload);

		// formData.append("user_template[template_name]", values.template_name);
		// formData.append("user_template[template_type]", values.template_header);
		// formData.append("user_template[template_language]", values.template_language);
		// formData.append("user_template[template_category]", values.template_category);
		// formData.append("user_template[template_subcategory]", values.template_subcategory);
		// formData.append("user_template[subtitle]", values.subtitle);
		// // formData.append("user_template[buttons]", JSON.stringify(values.buttons));
		// // formData.append("user_template[has_buttons]", values.buttons.length > 0);
		// formData.append("user_template[body]", transformDoubleAsterisksAndUnderscores(values.body));
		// contentVariables.forEach(variable => {
		// 	formData.append("user_template[content_variables][]", variable);
		// });

		// axios.post(`/api/v1/user_templates`, formData, { multipart: true }).then(response => {
		// toast.success(response.data.message || "Template added successfully");
		// });
	};

	return (
		<div className={className}>
			<Formik
				initialValues={{
					template_name: "",
					template_language: "",
					template_category: "marketing",
					template_subcategory: "custom",
					template_header: "none",
					header_text: "",
					body: "",
					variableValues: [],
					buttons: { value: "", body: {} },
				}}
				enableReinitialize
				validationSchema={TemplateValidations}
				onSubmit={values => handleFormSubmit(values)}>
				{({ setFieldValue, setFieldError, values }) => (
					<Form className="w-full flex flex-col items-start justify-center gap-4">
						{/* Name - Language */}
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikInput
								type={"text"}
								name={"template_name"}
								label={"Template Name"}
								placeholder={"Enter Template Name"}
								onChange={e => {
									setFieldValue("template_name", e.target.value);
								}}
								labelClassName={`md:text-base text-sm peer-focus:text-primary`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border border-black rounded-lg`}
							/>
							<FormikSelect
								name={"template_language"}
								label={"Template Language"}
								optionData={[
									{ value: "en", label: "English" },
									{ value: "en_US", label: "English(US)" },
									{
										value: "en_UK",
										label: "English(UK)",
									},
								]}
								onChange={e => setFieldValue("template_language", e.target.value)}
								valueProperty={"value"}
								labelProperty={"label"}
								selectedOption={"Select language"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
						</div>

						{/* Category - Subcategory */}
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikSelect
								name={"template_category"}
								label={
									<div className="flex items-center justify-between gap-2">
										<p className="font-normal">Template Category</p>
										<InfoIcon className="size-4 cursor-pointer" onClick={() => setOpenCategoryInfo(true)} />
									</div>
								}
								optionData={[
									{ value: "marketing", label: "Marketing" },
									{ value: "utility", label: "Utility" },
									{
										value: "authentication",
										label: "Authentication",
									},
								]}
								valueProperty={"value"}
								labelProperty={"label"}
								onChange={e => {
									setFieldValue("template_category", e.target.value);
								}}
								selectedOption={"Select a category"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary w-full`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
							<FormikInput
								type={"text"}
								name={"template_subcategory"}
								label={"Template Subcategory"}
								readOnly={true}
								value={["marketing", "utility"].includes(values.template_category) ? "custom" : "one-time passcode"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary w-full`}
								className={`w-full capitalize cursor-not-allowed mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
						</div>

						{/* Header */}
						<div className="w-full flex flex-col gap-2">
							<FormikSelect
								name={"header"}
								label={"Header"}
								optionData={[
									{ value: "none", label: "None" },
									{ value: "text", label: "Text" },
									{ value: "image", label: "Image" },
									{ value: "video", label: "Video" },
									{ value: "document", label: "Document" },
								]}
								valueProperty={"value"}
								labelProperty={"label"}
								onChange={e => {
									setHeaderText("");
									setTemplateType(e.target.value);
									setFieldValue("template_header", e.target.value);
								}}
								selectedOption={"Select Header"}
								labelClassName={"md:text-base text-sm peer-focus:text-primary w-full"}
								className={
									"w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg"
								}
							/>
							{templateType !== "none" ? (
								<input
									type="text"
									id="header-text"
									name="header-text"
									placeholder={templateType === "text" ? "Enter text" : "Enter the media link"}
									value={headerText}
									onChange={e => setHeaderText(e.target.value)}
									className="w-full text-xs !mt-0 peer font-normal !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg"
								/>
							) : null}
						</div>

						{/* Body */}
						<div className="w-full -mb-1">
							<FormikTextarea
								name={"body"}
								label={
									<div className="flex items-center justify-between gap-2 w-full">
										<p className="font-normal">Body</p>
										<button
											onClick={() => addBodyVariable({ setFieldValue })}
											type="button"
											className="w-fit whitespace-nowrap flex items-center justify-center gap-1 transition-all duration-300 hover:bg-gray-200 text-xs font-normal p-2 py-1 rounded-lg">
											<PlusIcon className="size-3" />
											Add Variable
										</button>
									</div>
								}
								placeholder={"Enter Body"}
								onChange={e => handleBodyChange(e, setFieldError, setFieldValue)}
								value={values.body}
								// errorClassName={"!hidden"}
								containerClassName={"w-full"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary w-full`}
								className={`!w-full h-40 mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border border-black rounded-lg`}
							/>
						</div>
						{bodyVariables.length > 0 && (
							<div className="w-full flex flex-col gap-3">
								<p className="md:text-base text-sm font-normal w-full -mb-2">Variables default values</p>
								<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
									{bodyVariables.map((variable, index) => (
										<FormikInput
											key={index}
											type={"text"}
											name={`variableValues[${index}]`}
											onChange={e => setFieldValue(`variableValues[${index}]`, e.target.value)}
											placeholder={`${variable.replaceAll("{{", "").replaceAll("}}", "")} value`}
											className={"mt-0 !text-xs"}
										/>
									))}
								</div>
							</div>
						)}

						{/* Select Button Type */}
						<div className="w-full">
							<FormikSelect
								name={"buttons.value"}
								label={"Buttons"}
								optionData={[
									{ value: "phone_number", label: "Call Phone Number" },
									{ value: "url", label: "Visit Website" },
								]}
								valueProperty={"value"}
								labelProperty={"label"}
								onChange={e => setFieldValue("buttons.value", e.target.value)}
								selectedOption={"Select Button"}
								labelClassName={"md:text-base text-sm peer-focus:text-primary w-full"}
								className={
									"w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg"
								}
							/>
						</div>

						{/* Render button fields based on selected option */}
						{values.buttons.value === "phone_number" && (
							<div className="w-full flex items-center justify-center gap-4">
								<FormikInput
									type="number"
									max={99999}
									length={6}
									name="buttons.body.cc"
									label="Country Code"
									placeholder="Enter Country Code"
									labelClassName={"!text-xs"}
									onChange={e => setFieldValue("buttons.body.cc", e.target.value)}
									className="!mt-5 text-xs"
								/>
								<FormikInput
									type="text"
									name="buttons.body.phone_number"
									label="Phone Number"
									placeholder="Enter Phone Number"
									labelClassName={"!text-xs"}
									onChange={e => setFieldValue("buttons.body.phone_number", e.target.value)}
									className="!mt-5 text-xs"
								/>
							</div>
						)}
						{values.buttons.value === "url" && (
							<div className="w-full">
								<FormikInput
									type="url"
									name="buttons.body.website_url"
									label="Website URL"
									placeholder="Enter Website URL"
									labelClassName={"!text-xs"}
									onChange={e => setFieldValue("buttons.body.website_url", e.target.value)}
									className="!mt-5 text-xs"
								/>
							</div>
						)}

						{/* Submit Button */}
						<button type="submit" className="bg-primary text-white font-normal px-4 py-2.5 rounded-lg">
							Submit
						</button>
					</Form>
				)}
			</Formik>

			{/* Preview Div */}
			<div className="xl:max-w-72 lg:max-w-64 max-w-full w-full bg-gray-100 shadow border border-primary/10 p-4 rounded-lg h-fit max-h-full">
				<p className="text-xl mb-2">Template Preview</p>
				<div className="relative w-full h-80 overflow-hidden rounded border border-primary/30">
					{/* Preview bg image */}
					<img
						src={whatsappBG}
						className="w-full h-80 !saturate-[200%] hue-rotate-15 absolute top-0 left-0 object-cover z-0"
						alt=""
					/>
					<div className="w-full h-full z-10 relative p-2 pb-3 pl-4">
						<TriangleRightIcon className="absolute top-[7.5px] z-10 left-2 size-4 text-white fill-white -rotate-90" />
						{/* Preview Message */}
						<div className="w-full h-fit max-h-full bg-white relative shadow no-scrollbar overflow-y-scroll rounded-lg rounded-tl-none p-1 font-normal break-words text-xs">
							{templateType === "text" && <p className="text-base font-bold w-full mx-1 pr-1">{headerText}</p>}
							{templateType === "image" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<img
										id="previewImage"
										src={
											headerText || "https://www.huaweicentral.com/wp-content/uploads/2021/09/whatsapp-1-768x432.jpg"
										}
										alt="Preview img not selected"
										className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10"
									/>
								</div>
							)}
							{templateType === "video" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<div className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10 bg-gray-300 flex items-center justify-center">
										<CirclePlayIcon className="text-gray-600 size-10 stroke-1" />
										{/* <video
											// controls
											id="videoPreview"
											className="w-full h-full object-cover"
											src={headerText || "https://www.youtube.com/watch?v=RlPNh_PBZb4"}
											autoPlay
											muted
										/> */}
									</div>
								</div>
							)}
							{templateType === "document" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<div className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10 bg-gray-300 flex items-center justify-center">
										<FileTextIcon className="text-gray-600 size-10 stroke-1" />
									</div>
								</div>
							)}
							<div
								className={`font-normal leading-relaxed pt-1 px-1 mb-px`}
								dangerouslySetInnerHTML={{
									__html: transformDoubleAsterisksAndUnderscores(body) || "please enter a message",
								}}
							/>
							{}
							<div>

							</div>
						</div>
					</div>
				</div>
			</div>

			{openCategoryInfo && (
				<FormHeaderComponent headerText={"Template Categories"} onClose={() => setOpenCategoryInfo(false)}>
					<div className="w-full flex flex-col gap-4">
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">Marketing</p>
							<p className="text-sm font-light">
								Marketing is used for promotions or information about your business, products or services. Or any
								message that isn’t utility or authentication. Examples: welcome messages, newsletters, offers, coupons,
								catalogs, new store hours.
							</p>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">Utility</p>
							<p className="text-sm font-light">
								Utility is used for transaction, account, order or customer request. Examples: order confirmations,
								account updates, receipts, appointment reminders, billing. (Choose Marketing if you want to include
								promotion with the Utility message.)
							</p>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">Authentication</p>
							<p className="text-sm font-light">
								Authentication is used for one-time passwords that your customers use to authenticate a transaction or
								login. Examples: one-time password, account recovery code.
							</p>
						</div>
					</div>
				</FormHeaderComponent>
			)}
		</div>
	);
};

export default AddTemplateForm;
