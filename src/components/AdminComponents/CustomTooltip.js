import React from "react";

const CustomTooltip = ({ text, position, classes }) => {
	const positionClass = {
		"top-left": "-top-7 left-0 origin-bottom-left",
		"top-center": "-top-7 left-1/2 translate-x-[-50%] origin-bottom",
		"top-right": "-top-7 right-0 origin-bottom-right",
		"bottom-left": "-bottom-8 left-0 origin-top-left",
		"bottom-center": "-bottom-8 left-1/2 translate-x-[-50%] origin-top",
		"bottom-right": "-bottom-8 right-0 origin-top-right",
		left: "top-1/2 translate-y-[-50%] right-[calc(100%+8px)] origin-right",
		right: "top-1/2 translate-y-[-50%] left-[calc(100%+8px)] origin-left",
	};
	const arrowPositionClass = {
		"top-left": "bottom-[-4px] left-2",
		"top-center": "bottom-[-4px] left-1/2 translate-x-[-50%]",
		"top-right": "bottom-[-4px] right-2",
		"bottom-left": "top-[-4px] left-2",
		"bottom-center": "top-[-4px] left-1/2 translate-x-[-50%]",
		"bottom-right": "top-[-4px] right-2",
		left: "top-1/2 translate-y-[-50%] right-[-4px]",
		right: "top-1/2 translate-y-[-50%] left-[-4px]",
	};
	return (
		<div
			className={`${classes} ${positionClass[position]} select-none w-fit whitespace-nowrap px-2 py-1 transition-all duration-300 absolute bg-gray-600 rounded-md text-center text-xs font-semibold text-gray-300`}>
			{text}
			<div className={`absolute w-2 h-2 bg-gray-600 transform rotate-45 ${arrowPositionClass[position]}`} />
		</div>
	);
};

export default CustomTooltip;
