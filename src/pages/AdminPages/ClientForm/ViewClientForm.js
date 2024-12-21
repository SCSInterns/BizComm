import React from "react";

import FormHeaderComponent from "../../../components/AdminComponents/FormHeaderComponent";
import TextareaInput from "../../../components/Inputs/TextareaInput";
import TextInput from "../../../components/Inputs/TextInput";

import { PencilIcon } from "lucide-react";

const ViewClientForm = ({ form, onClose, openEditForm }) => {
	return (
		<FormHeaderComponent headerText={"View Client Form"} onClose={onClose}>
			<div className="w-full flex flex-col items-end gap-3 -mt-3">
				<button
					onClick={() => {
						onClose();
						openEditForm();
					}}
					className="flex items-center justify-center gap-2 font-normal text-sm bg-primary text-white rounded-lg p-2 px-3">
					<PencilIcon className="!size-3.5" />
					Edit Form
				</button>
				<div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
					{/* {Object.entries(additional_fields).map((entry) => { */}
					{Object.keys(form.additional_fields).length > 0 ? (
						Object.entries(form.additional_fields).map((entry) => {
							let key = entry[0];
							let value = entry[1];
							console.log(entry);
							switch (value.type) {
								case "textarea":
									return (
										<TextareaInput
											key={key}
											label={key}
											name={key}
											disabled={true}
											value={value["type"]}
											required={true}
										/>
									);
								case "select":
									return (
										<div className="w-full">
											<p className="font-medium mb-[3px] text-gray-800 capitalize text-sm">
												{key}
											</p>
											<div className="!bg-primary/10 !text-sm h-9 overflow-x-scroll custom-small-scrollbar flex items-center justify-start gap-1 rounded-md !font-normal !text-gray-800 !border !border-gray-800 !outline-none !px-2 !capitalize">
												{value.options.map(
													(val, idx) => {
														return (
															<span
																key={idx}
																className="border rounded-full text-xs border-black px-2 py-0.5">
																{val}
															</span>
														);
													}
												)}
											</div>
										</div>
									);
								case "checkbox":
									return (
										<div className="w-full col-span-2">
											<p className="font-medium mb-2 text-gray-800 capitalize text-sm">
												{key}
											</p>
											<div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 border border-gray-700 rounded-lg bg-primary/10 p-2">
												{value.options.map(
													(val, idx) => {
														return (
															<div
																className="flex items-center gap-2"
																key={idx}>
																<input
																	type="checkbox"
																	id={`${val}-${idx}`}
																	name={`${val}-${idx}`}
																	className="!size-3 accent-primary"
																/>
																<label
																	htmlFor={`${val}-${idx}`}
																	className="text-xs font-medium text-gray-700 capitalize">
																	{val}
																</label>
															</div>
														);
													}
												)}
											</div>
										</div>
									);
								default:
									return (
										<TextInput
											type={value.type}
											key={key}
											label={key}
											name={key}
											value={value["type"]}
											required={true}
											readOnly={true}
											labelClasses={
												"font-medium mb-0.5 text-gray-800"
											}
											classes="!bg-primary/10 !text-sm !font-normal !text-gray-800 !border !border-gray-800 !outline-none !px-3 !capitalize !tracking-normal"
										/>
									);
							}
						})
					) : (
						<div className="w-full h-full min-h-40 text-xl flex items-center justify-center col-span-2 bg-primary/10 p-5 rounded-lg border-2 border-dashed border-primary">
							<p className="w-full text-center text-primary">
								No fields have been added to this form. Please
								click on the "Edit" button to udpate the client
								form to add fields.
							</p>
						</div>
					)}
				</div>
			</div>
		</FormHeaderComponent>
	);
};

export default ViewClientForm;
