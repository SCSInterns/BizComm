import React from "react";

const TableLoading = ({ text, loader }) => {
	return (
		<div className="flex items-center justify-center gap-2 text-xl text-gray-700 font-medium w-full p-10">
			{loader}
			<p className="whitespace-nowrap">{text}</p>
		</div>
	);
};

export default TableLoading;
