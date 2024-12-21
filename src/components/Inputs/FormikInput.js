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
				className={`${className} mt-7`}
			/>
			<label htmlFor={name} className={`${labelClassName} absolute top-0 left-0 bg-white`}>{label}</label>
			<ErrorMessage
				name={name}
				className="text-red-500 text-sm mt-1 !font-medium bg-white"
				component="div"
			/>
		</div>
	);
}

export default FormikInput;
