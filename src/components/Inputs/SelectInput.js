import React from "react";

const SelectInput = ({ name, label, value, onChange, options, labelClasses, classes }) => {
	return (
		<div className="form-group">
			<label htmlFor={name} className={labelClasses}>{label}</label>
			<select
                id={name}
				name={name}
                value={value || ""}
				onChange={onChange}
				className={`form-control !w-full ${classes}`}
			>
                <option value="">Select</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;


// import React from "react";

// const SelectInput = ({ name, label, value, onChange, options }) => {
// 	return (
// 		<div className="form-group">
// 			<label htmlFor={name}>{label}</label>
// 			<select
// 				id={name}
// 				name={name}
// 				value={value || ""}
// 				onChange={onChange}
// 				className="form-control"
// 			>
// 				<option value="" disabled>Select {label}</option>
// 				{options.map((option, index) => (
// 					<option key={index} value={option}>
// 						{option}
// 					</option>
// 				))}
// 			</select>
// 		</div>
// 	);
// };

// export default SelectInput;
