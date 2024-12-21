import React from "react";

const TextInput = ({ name, type, label, value, onChange, maxLength, minLength, classes, labelClasses, readOnly }) => {
	return (
		<div className="form-group !w-full">
			<label htmlFor={name} className={labelClasses}>
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
                minLength={minLength}
                maxLength={maxLength}
				placeholder={label}
				readOnly={readOnly}
				value={value}
				onChange={onChange}
				className={`!w-full ${classes}`}
				required
			/>
		</div>
	);
};

export default TextInput;
