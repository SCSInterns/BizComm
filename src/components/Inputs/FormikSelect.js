/** @format */

import { ErrorMessage, Field } from "formik";
import React from "react";

function FormikSelect({
	label,
	labelClassName,
	containerClassName,
	name,
	className,
	selectedOption,
	onChange,
	optionData,
	disable,
	valueProperty = "name",
	labelProperty = "name",
}) {
	return (
		<div className={`font-normal w-full relative ${containerClassName}`}>
			<Field name={name} as="select" disabled={disable} onChange={onChange} className={`${className} mt-7`}>
				<option selected value="" disabled>
					{selectedOption}
				</option>
				{optionData?.map((option, index) => (
					<option key={index} value={option[valueProperty]}>
						{option[labelProperty]}
					</option>
				))}
			</Field>
			<label htmlFor={name} className={`${labelClassName} absolute top-0 left-0 bg-white`}>
				{label}
			</label>
			<ErrorMessage name={name} className="text-red-500 text-xs mt-1 font-normal" component="div" />
		</div>
	);
}

export default FormikSelect;
