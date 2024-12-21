import React from "react";

const LoaderWith3Lines = () => {
	return (
		<span className="relative inline-block w-8 h-8">
			<span className="absolute inset-0 m-auto w-4 h-4 rounded-full border-[3px] border-gray-400 border-t-transparent border-l-transparent box-border animate-rotate"></span>
			<span className="absolute inset-0 m-auto w-6 h-6 rounded-full border-[3px] border-transparent border-b-primary border-r-primary box-border animate-rotate-back"></span>
			<span className="absolute inset-0 m-auto w-8 h-8 rounded-full border-[3px] border-gray-400 border-t-transparent border-l-transparent box-border animate-rotate"></span>
		</span>
	);
};

export default LoaderWith3Lines;
