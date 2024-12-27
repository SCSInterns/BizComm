/** @format */

import { LayoutTemplateIcon } from "lucide-react";
import React from "react";
import AddTemplateForm from "./TemplateForm/AddTemplateForm";

const AddTemplatePage = () => {
	return (
		<div className="w-full h-full min-h-[calc(100vh-3rem)] pl-4 mt-3 relative">
			<div className="w-full flex flex-col items-center justify-center md:gap-6 gap-4">
				{/* Header Div */}
				<div className="w-full flex md:flex-row flex-col items-center justify-between gap-4">
					<div className="h-full flex items-center justify-center gap-2">
						<LayoutTemplateIcon className="size-7" />
						<h1 className="text-3xl">Add Template</h1>
					</div>
				</div>
				<AddTemplateForm className="w-full flex lg:flex-row flex-col-reverse items-start justify-start gap-6" />
			</div>
		</div>
	);
};

export default AddTemplatePage;
