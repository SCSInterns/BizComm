import { XIcon } from "lucide-react";
import React from "react";

const FormHeaderComponent = ({ headerText, onClose, className, childrenClassName, children }) => {
	return (
		<div className={`fixed top-0 left-0 w-full h-full min-h-screen overflow-y-scroll bg-black bg-opacity-50 z-50 flex justify-center items-center p-6 px-4 `}>
			<div className={`bg-white rounded-lg p-6 font-normal w-full max-w-[50rem] max-h-[90vh] overflow-y-auto custom-scrollbar ${className}`}>
				<div className="w-full flex items-center justify-between gap-2 mb-4">
					<h1 className="font-bold text-2xl">
						{headerText}
					</h1>
					<button onClick={onClose}>
						<XIcon className="size-7 p-1 rounded-md hover:bg-primary text-black hover:text-white" />
					</button>
				</div>
				<div className={childrenClassName}>
                	{children}
				</div>
			</div>
		</div>
	);
};

export default FormHeaderComponent;
