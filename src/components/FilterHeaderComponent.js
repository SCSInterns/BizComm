/** @format */

import React from "react";

const FilterHeaderComponent = ({ headerText, children, className, childrenClassName, openFiltersDiv }) => {
	return (
		<div
			className={`${className} ${
				openFiltersDiv ? "scale-0" : "scale-100"
			} origin-top-right transition-all duration-300 absolute top-[calc(100%+5px)] right-0 min-w-96 w-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50`}>
			<p className="font-semibold px-3 py-2">{headerText}</p>
			<div className={`w-full h-full max-h-96 overflow-y-auto ${childrenClassName}`}>{children}</div>
		</div>
	);
};

export default FilterHeaderComponent;
