/** @format */

import { ErrorMessage, Field } from "formik";
import React from "react";

function FormikInput({
	label,
	labelClassName,
	containerClassName,
	onChange,
	name,
	type,
	placeholder,
	className,
	readOnly,
	value,
	length,
	disable,
	min,
	max,
}) {
	return (
		<div className={`font-normal w-full relative !z-0 ${containerClassName}`}>
			<Field
				id={name}
				name={name}
				placeholder={placeholder}
				readOnly={readOnly}
				type={type}
				onChange={onChange}
				value={value}
				maxLength={length}
				disabled={disable}
				max={max}
				min={min}
				className={`${className} w-full peer font-normal text-sm !outline-none focus:ring-4 focus:ring-primary/40 focus:border-primary py-2 px-2 border border-black rounded-lg mt-7`}
			/>
			<label htmlFor={name} className={`${labelClassName} absolute top-0 left-0 bg-white`}>
				{label}
			</label>
			<ErrorMessage name={name} className="text-red-500 text-xs mt-1 !font-medium bg-white" component="div" />
		</div>
	);
}

export default FormikInput;
