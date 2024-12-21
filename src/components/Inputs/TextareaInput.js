import React from "react";

const TextareaInput = ({ name, label, value, onChange }) => {
	return (
		<div className="form-group !w-full">
			<label htmlFor={name} className="">
				{label}
			</label>
			<textarea
				id={name}
				name={name}
				placeholder={label}
				className="custom-textarea !w-full"
				value={value}
				onChange={onChange}
				rows={4}
			></textarea>
		</div>
	);
};

export default TextareaInput;
