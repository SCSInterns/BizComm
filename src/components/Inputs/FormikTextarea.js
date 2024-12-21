import { ErrorMessage, Field } from "formik";
import React from "react";

function FormikTextarea({
	label,
	labelClassName,
	containerClassName,
	errorClassName,
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
	rows,
	cols,
}) {
	return (
		<div className={`font-normal ${containerClassName} relative`}>
			<Field
                as="textarea"
				id={name}
				name={name}
				placeholder={placeholder}
				readOnly={readOnly}
				type={type}
				onChange={onChange}
				maxLength={length}
				disabled={disable}
				max={max}
				min={min}
				cols={cols}
				rows={rows}
				className={`${className} mt-7`}
			/>
			<label htmlFor={name} className={`${labelClassName} absolute top-0 left-0 bg-white`}>{label}</label>
			<ErrorMessage
				name={name}
				className={`text-red-500 text-sm font-normal ${errorClassName}`}
				component="div"
			/>
		</div>
	);
}

export default FormikTextarea;
