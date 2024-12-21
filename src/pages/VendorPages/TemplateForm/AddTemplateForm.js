import React, { useState } from "react";

import { Form, Formik } from "formik";
import FormikInput from "../../../components/Inputs/FormikInput";
import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";

import { TemplateValidations } from "../../../Validations";
import FormikSelect from "../../../components/Inputs/FormikSelect";
import {
	CirclePlayIcon,
	FileTextIcon,
	InfoIcon,
	PlusIcon,
	TriangleRightIcon,
} from "lucide-react";
import FormikTextarea from "../../../components/Inputs/FormikTextarea";

// import whatsappBG from "../../../image/whatsapp-bg.jpg";
import whatsappBG from "../../../image/whatsapp-bg.png";

const AddTemplateForm = ({ onClose, fetchTemplates }) => {
	const [openCategoryInfo, setOpenCategoryInfo] = useState(false);
	const [bodyVariables, setBodyVariables] = useState([]);
	const [media, setMedia] = useState(null);
	const [body, setBody] = useState("Hello");
	const [templateType, setTemplateType] = useState("");

	// FUnction to add variable to body
	const addBodyVariable = ({ setFieldValue }) => {
		const textEditor = document.getElementById("body");
		const { selectionStart, selectionEnd, value } = textEditor;
		const newVar = `{{variable-${bodyVariables.length + 1}}} `;

		const updatedText =
			value.substring(0, selectionStart) +
			newVar.toString() +
			value.substring(selectionEnd);

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

		const regex = /\{\{variable-[\w-]+\}\}/g;
		const currentVariables = newValue.match(regex) || [];
		setBodyVariables(currentVariables);

		const totalWords = newValue.trim().split(/\s+/).length;
		const nonVariableWords = totalWords - currentVariables.length;

		const requiredNonVariableWords = 2 * currentVariables.length + 1;

		if (requiredNonVariableWords > nonVariableWords) {
			setFieldError(
				"body",
				`Min non-variable words not met. Current words: ${nonVariableWords}, Required words: ${requiredNonVariableWords}`
			);
			console.error(
				`Error! Current words: ${nonVariableWords}, Required words: ${requiredNonVariableWords}`
			);
		}
	};

	const transformDoubleAsterisksAndUnderscores = (text) => {
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

	const handleTempTypeChange = (e, setFieldValue) => {
		setFieldValue("template_type", e.target.value);
		setTemplateType(e.target.value);
	};

	const handleFormSubmit = async (values) => {
		const formData = new FormData();

		formData.append("template_name", values.template_name);
		formData.append("template_type", values.template_type);
		formData.append("template_language", values.template_language);
		formData.append("template_category", values.template_category);
		formData.append("media", media);
		formData.append(
			"body",
			transformDoubleAsterisksAndUnderscores(values.body)
		);
	};

	return (
		<FormHeaderComponent
			headerText="Add Template"
			onClose={onClose}
			className={"lg:!max-w-[90%] !max-w-[95%]"}
			childrenClassName={
				"w-full flex md:flex-row flex-col-reverse items-start justify-start gap-4"
			}>
			<Formik
				initialValues={{
					template_name: "",
					template_type: "",
					template_language: "",
					template_category: "",
					media: null,
					body: body,
					subtitle: "",
					buttons: [],
				}}
				enableReinitialize
				onSubmit={(values) => handleFormSubmit(values)}
				validationSchema={TemplateValidations}>
				{({
					setFieldValue,
					errors,
					touched,
					setFieldError,
					values,
				}) => (
					<Form className="w-full flex flex-col items-center justify-center gap-4">
						{/* Name - Type */}
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikInput
								type={"text"}
								name={"template_name"}
								label={"Template Name"}
								placeholder={"Enter Template Name"}
								onChange={(e) => {
									setFieldValue(
										"template_name",
										e.target.value
									);
								}}
								labelClassName={`md:text-base text-sm peer-focus:text-primary`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border border-black rounded-lg`}
							/>
							<FormikSelect
								name={"template_type"}
								label={"Template Type"}
								optionData={[
									{
										value: "message_only",
										label: "Message Only",
									},
									{ value: "image", label: "Image" },
									{ value: "video", label: "Video" },
									{ value: "pdf", label: "PDF" },
								]}
								onChange={(e) =>
									handleTempTypeChange(e, setFieldValue)
								}
								valueProperty={"value"}
								labelProperty={"label"}
								selectedOption={"Select template type"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
						</div>

						{/* Language - Category */}
						<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
							<FormikSelect
								name={"template_language"}
								label={"Template Language"}
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
								onChange={(e) => {
									setFieldValue(
										"template_language",
										e.target.value
									);
								}}
								selectedOption={"Select a language"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary w-full`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
							<FormikSelect
								name={"template_category"}
								label={
									<div className="flex items-center justify-between gap-2">
										<p className="font-normal">
											Template Category
										</p>
										<InfoIcon
											className="size-4 cursor-pointer"
											onClick={() =>
												setOpenCategoryInfo(true)
											}
										/>
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
								onChange={(e) => {
									setFieldValue(
										"template_category",
										e.target.value
									);
								}}
								selectedOption={"Select a category"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary w-full`}
								className={`w-full mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg`}
							/>
						</div>

						{/* Body */}
						<div className="w-full">
							<FormikTextarea
								name={"body"}
								label={"Body"}
								placeholder={"Enter Body"}
								onChange={(e) =>
									handleBodyChange(
										e,
										setFieldError,
										setFieldValue
									)
								}
								errorClassName={"!hidden"}
								containerClassName={"w-full"}
								labelClassName={`md:text-base text-sm peer-focus:text-primary`}
								className={`!w-full h-40 mt-1 peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-3 border border-black rounded-lg`}
							/>
							<div className="w-full flex items-center justify-between gap-3 -mt-1">
								{/* Error Message for Body */}
								<div className="text-red-600 w-full font-normal text-sm">
									{errors.body && touched.body
										? errors.body
										: ""}
								</div>
								{/* Add Variable Btn */}
								<button
									onClick={() =>
										addBodyVariable({ setFieldValue })
									}
									type="button"
									className="w-fit whitespace-nowrap flex items-center justify-center gap-1 transition-all duration-300 hover:bg-gray-200 text-xs font-normal p-2 rounded-lg">
									<PlusIcon className="size-3" />
									Add Variable
								</button>
							</div>
						</div>

						{/* Media URL */}
						{templateType !== "message_only" &&
							templateType !== "pdf" &&
							templateType !== "" && (
								<div className="w-full relative -mt-3">
									<FormikInput
										type="file"
										name="media"
										label={"Sample Media File"}
										labelClassName={`md:text-base text-sm peer-focus:text-primary`}
										className={`w-full mt-1 peer font-normal text-sm !outline-none file:bg-primary file:border-none file:rounded file:text-xs file:mr-2 file:py-1.5 file:px-3 file:text-white focus:ring-4 focus:ring-primary/40 focus:border-primary p-2 border border-black rounded-lg`}
										onChange={(e) => {
											var media = document.getElementById(
												`${
													templateType === "image"
														? "previewImage"
														: "videoPreview"
												}`
											);
											setMedia(e.target.files[0]);
											var urlBlob = URL.createObjectURL(
												e.target.files[0]
											);
											media.src = urlBlob;
											if (templateType === "video") {
												media.load();
												media.onloadeddata =
													function () {
														media.play();
													};
											}
										}}
									/>
								</div>
							)}

						<button className="bg-primary text-white font-normal px-3 py-2 rounded-lg">
							Submit
						</button>
					</Form>
				)}
			</Formik>

			{/* Preview Div */}
			<div className="md:w-80 w-full bg-gray-100 shadow border border-primary/10 p-4 rounded-lg h-fit max-h-full">
				{/* Preview Header */}
				<p className="text-xl mb-2">Template Preview</p>
				{/* Preview Body */}
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
							{templateType === "image" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<img
										id="previewImage"
										src={
											"https://www.huaweicentral.com/wp-content/uploads/2021/09/whatsapp-1-768x432.jpg"
										}
										alt="Preview img not selected"
										className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10"
									/>
								</div>
							)}
							{templateType === "video" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<div className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10 bg-gray-300 flex items-center justify-center">
										{/* <CirclePlayIcon className="text-gray-600 size-10 stroke-1" /> */}
										<video
											// controls
											id="videoPreview"
											className="w-full h-full object-cover"
											autoPlay
											muted
										/>
									</div>
								</div>
							)}
							{templateType === "pdf" && (
								<div className="w-full md:h-28 h-40 flex items-center justify-center rounded overflow-hidden">
									<div className="w-full md:h-28 h-40 aspect-video object-cover font-normal z-10 bg-gray-300 flex items-center justify-center">
										<FileTextIcon className="text-gray-600 size-10 stroke-1" />
									</div>
								</div>
							)}
							<div
								className={`font-normal leading-relaxed px-1 ${
									templateType === "message_only"
										? "mt-px"
										: "mt-1"
								} mb-px`}
								dangerouslySetInnerHTML={{
									__html:
										transformDoubleAsterisksAndUnderscores(
											body
										) || "please enter a message",
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			{openCategoryInfo && (
				<FormHeaderComponent
					headerText={"Template Categories"}
					onClose={() => setOpenCategoryInfo(false)}>
					<div className="w-full flex flex-col gap-4">
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">Marketing</p>
							<p className="text-sm font-light">
								Marketing is used for promotions or information
								about your business, products or services. Or
								any message that isn’t utility or
								authentication. Examples: welcome messages,
								newsletters, offers, coupons, catalogs, new
								store hours.
							</p>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">Utility</p>
							<p className="text-sm font-light">
								Utility is used for transaction, account, order
								or customer request. Examples: order
								confirmations, account updates, receipts,
								appointment reminders, billing. (Choose
								Marketing if you want to include promotion with
								the Utility message.)
							</p>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="font-semibold text-lg">
								Authentication
							</p>
							<p className="text-sm font-light">
								Authentication is used for one-time passwords
								that your customers use to authenticate a
								transaction or login. Examples: one-time
								password, account recovery code.
							</p>
						</div>
					</div>
				</FormHeaderComponent>
			)}
		</FormHeaderComponent>
	);
};

export default AddTemplateForm;
