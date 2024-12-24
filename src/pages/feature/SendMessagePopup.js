import React, { useState, useEffect } from "react";
import "./SendMessagePopup.css";
import axios from "axios";
import { AiFillFilePdf } from "react-icons/ai";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const SendMessagePopup = ({ onClose, selectedContacts, showNotification }) => {
	const [message, setMessage] = useState("");
	const [selectedMethod, setSelectedMethod] = useState("whatsapp");
	const [sendAs, setSendAs] = useState("all");
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showMessageSent, setShowMessageSent] = useState(false);
	const [availableFiles, setAvailableFiles] = useState([]);
	const [showFilePopup, setShowFilePopup] = useState(false);

	const emailTemplates = [
		{
			message: false,
			image: true,
			link: true,
		},
		{
			message: true,
			image: true,
			link: true,
		},
		{
			message: true,
			image: true,
			link: false,
		},
	];

	const whatsappTemplates = [
		{
			id: 1,
			name: "Message only",
			message: true,
			image: false,
			video: false,
			pdf: false,
			text_message: 'Hello {{user}}! {{message}}. Thank you. Have a great day ahead.',
			content_sid: "HXba5845a24cb97d7b93dbb324f220a65d",
			content_variables: ["user", "message"]
		},
		{
			id: 2,
			name: "Image + Message",
			message: false,
			image: true,
			video: false,
			pdf: false,
			text_message: 'Hello {{user}}! {{message}}. I hope you have a great day ahead.',
			content_sid: "HXb2106f758f10babd6394b2c5f3ac8df5",
			content_variables: ["user", "message", "key"]
		},
		{
			id: 3,
			name: "Video + Message",
			message: false,
			image: false,
			video: true,
			pdf: false,
			text_message: 'Hello {{user}}! {{message}}. I hope you have a great day ahead.',
			content_sid: "HXda47c4de5368ca9ff5c78b6eb111fa2d",
			content_variables: ["user", "message", "key"]
		},
		{
			id: 4,
			name: "PDF + Message",
			message: false,
			image: false,
			video: false,
			pdf: true,
			text_message: 'Hello {{user}}! {{message}}. I hope you have a great day ahead.',
			content_sid: "HXad9fa13d6ce1ab7e1dfee3d6c538b2ed",
			content_variables: ["key"]
		},
	];

	const [templateData, setTemplateData] = useState(whatsappTemplates);

	useEffect(() => {
		let timer;
		if (showMessageSent) {
			timer = setTimeout(() => setShowMessageSent(false), 3000);
		}
		return () => clearTimeout(timer);
	}, [showMessageSent]);

	const handleMethodChange = (e) => {
		setSelectedMethod(e.target.value);
		if (e.target.value !== "sms")
			setTemplateData(
				e.target.value === "email" ? emailTemplates : whatsappTemplates
			);
	};

	const handleSendAsChange = (e) => {
		setSendAs(e.target.value);
		console.log(e.target.value)
	}

	const handleMessageChange = (e) => {
		setMessage(e.target.value);
	};

	const fetchFiles = async () => {
		try {
			const response = await axios.get(`/api/v1/get_files`);
			setAvailableFiles(response.data.files);
			setShowFilePopup(true);
		} catch (error) {
			console.error("Error fetching files:", error);
			showNotification(
				"An error occurred while fetching files.",
				"error"
			);
		}
	};

	const handleFileSelect = (file) => {
		if (selectedFile?.id === file.id) {
			setSelectedFile(null);
		} else {
			setSelectedFile(file);
		}
	};

	const handleTemplateChange = (template) => {
		setSelectedTemplate(template);
	};

	const getTrueKey = () => {
		return Object.keys(selectedTemplate).find(
		  	(key) => ["message", "image", "video", "pdf"].includes(key) && selectedTemplate[key] === true
		);
	};

	const handleRemoveFile = () => {
		setSelectedFile(null);
	};

	const handleSendMessage = async () => {
		if (selectedContacts.length === 0) {
			showNotification(
				"Please select at least one contact to send the message.",
				"error"
			);
			return;
		}

		if (!message && selectedFile === null) {
			showNotification(
				"Please enter a message or attach a file before sending.",
				"error"
			);
			return;
		}

		if (selectedMethod !== "sms" && selectedTemplate === null) {
			showNotification(
				"Please select a template before sending message.",
				"error"
			);
			return;
		}

		let contacts = [];
		const formData = new FormData();

		selectedContacts.forEach((contact) => {
			contacts.push(contact.mobile_number);
		});

		const contentVariables = {};
		if (selectedTemplate?.content_variables) {
			selectedTemplate.content_variables.forEach(variable => {
				contentVariables[variable] = '';
			});
		}

		formData.append("whatsapp[message_method]", selectedMethod);
		formData.append("whatsapp[message]", message);
		formData.append("whatsapp[content_sid]", selectedTemplate?.content_sid);
		// selectedTemplate?.content_variables.forEach((variable) => {
		// 	formData.append(`whatsapp[${variable}]`, variable);
		// });-*-*
		contacts.forEach((c) => {
			formData.append("whatsapp[numbers][]", c);
		});
		if (selectedFile !== null)
			formData.append("whatsapp[file]", selectedFile?.key);

		try {
			const response = await axios.post(
				"/api/v1/send_message",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 200) {
				setShowMessageSent(true);
				setSelectedFile(null);
				setMessage("");
				showNotification(response.data.message, "success");
				onClose();
			}
		} catch (error) {
			console.error("Error sending message:", error);
			showNotification(
				error.response.data.error || "Error sending message.",
				"error"
			);
		}
	};

	return (
		<div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center  !z-[999] lg:px-20 md:px-14 sm:px-10 px-8 bg-[rgba(0,0,0,0.5)] transition-all duration-300`}>
			<div className="w-full h-fit max-h-[80%] overflow-hidden bg-white rounded-xl overflow-y-scroll custom-scrollbar">
				<div className="send-message-popup-header bg-primary text-white p-5 mb-5">
					<h2 className="text-4xl font-bold">Send Message</h2>
					<button className="p-2 rounded-full bg-red-500/10 text-red-300 border border-red-300" onClick={onClose}>
						{/* <img src={cancel} alt="close" /> */}
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
						</svg>
					</button>
				</div>

				<div className="flex items-center justify-center px-5 gap-5">				
					{/* Methods Selection */}
					<div className="send-methods mb-3">
						<h3 className="!mb-1.5">Methods</h3>
						<select
							id="method-select"
							value={selectedMethod}
							onChange={handleMethodChange}
							className="!border-slate-500 !font-medium !rounded-lg !p-2 text-sm !outline-none">
							<option value="whatsapp">WhatsApp</option>
							<option value="sms">SMS</option>
							<option value="email">Email</option>
						</select>
					</div>

					{/* Filter Templates */}
					<div className="send-methods mb-3">
						<h3 className="!mb-1.5">Filter Templates</h3>
						<select
							id="method-select"
							value={sendAs}
							onChange={handleSendAsChange}
							className="!border-slate-500 !font-medium !rounded-lg !p-2 text-sm !outline-none">
							<option value="all">All</option>
							<option value="message">Message Only</option>
							<option value="image">Image</option>
							<option value="video">Video</option>
							<option value="pdf">PDF</option>
						</select>
					</div>
				</div>

				{/* Template Section */}
				{selectedMethod !== "sms" ? (
					<div className="px-5">
						<h3 className="mb-2">Templates</h3>
						<Swiper
							slidesPerView={6}
							spaceBetween={10}
							className="h-52 w-full mySwiper mb-3 ">
							{templateData.filter((t) => sendAs === "all" || t[sendAs] === true).map((template, idx) => {
								return (
									<SwiperSlide key={idx} onClick={() => handleTemplateChange(template)} className="cursor-pointer !h-52 !w-52 flex flex-col items-center justify-center gap-2">
										<div className={`${selectedTemplate?.id === template.id ? "bg-primary" : "bg-slate-200"} transition-all duration-200 drop-shadow rounded-lg border border-black h-full w-full p-3 flex flex-col items-center justify-center gap-2.5`}>
											{/* <div className="w-full h-full p-2 border-2 border-slate-500 rounded-md rounded-bl-none relative before:w-3 before:h-3 before:absolute before:-bottom-[7px] before:rotate-45 before:left-[1px] before:bg-gradient-to-b from-white via-slate-500 to-slate-500"> */}
											<div className={`w-full h-40 flex flex-col items-center justify-center gap-2 pt-3 p-2 px-3 border-2 ${selectedTemplate?.id === template.id ? "border-white before:border-t-white" : "border-slate-500 before:border-t-slate-500"}  rounded-md rounded-bl-none relative before:w-0 before:h-0 before:absolute before:-bottom-[7px] ${ idx % 2 === 0 ? "before:-left-[2px]" : "before:-left-[1px]" } before:border-l-[6px] before:border-l-transparent before:border-t-[6px] before:border-r-[6px] before:border-r-transparent`}>
												{(template.image) && (
													// <div className="mb-2 w-full h-auto flex items-center justify-center">
														<svg className={`w-full h-7 ${selectedTemplate?.id === template.id ? "text-white" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<circle cx={7.5} cy={7.5} r={1.5} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth={1.5} />
															<path d="M5 20.9999C9.37246 15.775 14.2741 8.884 21.4975 13.5424" stroke="currentColor" strokeWidth={1.5}/>
														</svg>
													// </div>
												)}
												{(template.video) && (
													// <div className="mb-2 w-full h-auto flex items-center justify-center">
														<svg className={`w-full h-7 ${selectedTemplate?.id === template.id ? "text-white" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    														<path d="M14.9531 12.3948C14.8016 13.0215 14.0857 13.4644 12.6539 14.3502C11.2697 15.2064 10.5777 15.6346 10.0199 15.4625C9.78934 15.3913 9.57925 15.2562 9.40982 15.07C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.40982 8.92995C9.57925 8.74381 9.78934 8.60868 10.0199 8.53753C10.5777 8.36544 11.2697 8.79357 12.6539 9.64983C14.0857 10.5356 14.8016 10.9785 14.9531 11.6052C15.0156 11.8639 15.0156 12.1361 14.9531 12.3948Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
															<path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth={1.5} />
  														</svg>
													// </div>
												)}
												{(template.pdf) && (
													// <div>
														<svg className={`w-full h-7 mb-1 ${selectedTemplate?.id === template.id ? "text-white" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
															<path d="M3.5 13V12.1963C3.5 9.22892 3.5 7.74523 3.96894 6.56024C4.72281 4.65521 6.31714 3.15255 8.33836 2.44201C9.59563 2.00003 11.1698 2.00003 14.3182 2.00003C16.1173 2.00003 17.0168 2.00003 17.7352 2.25259C18.8902 2.65861 19.8012 3.51728 20.232 4.60587C20.5 5.283 20.5 6.13082 20.5 7.82646V12.0142V13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
															<path d="M3.5 22V19M3.5 19V17.2C3.5 16.6343 3.5 16.3515 3.67574 16.1757C3.85147 16 4.13431 16 4.7 16H5.5C6.32843 16 7 16.6716 7 17.5C7 18.3284 6.32843 19 5.5 19H3.5ZM20.5 16H19C18.0572 16 17.5858 16 17.2929 16.2929C17 16.5858 17 17.0572 17 18V19M17 22V19M17 19H19.5M14 19C14 20.6569 12.6569 22 11 22C10.6262 22 10.4392 22 10.3 21.9196C9.96665 21.7272 10 21.3376 10 21V17C10 16.6624 9.96665 16.2728 10.3 16.0804C10.4392 16 10.6262 16 11 16C12.6569 16 14 17.3431 14 19Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													// </div>
												)}
												<div className={`flex flex-col items-start justify-normal gap-2 w-full h-auto ${selectedTemplate?.id === template.id ? "text-white" : "text-black"}`}>
													<p className="text-[10px] font-light w-full break-words line-clamp-4 leading-[1.7]">{template.text_message}</p>
												</div>
											</div>
											<p className={`text-xs font-normal ${selectedTemplate?.id === template.id ? "text-white" : "text-slate-500"}`}>{template.name}</p>
										</div> 
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				) : ("")}

				{/* Message Section */}
				{ (selectedMethod !== "email") && (
					<div className="px-5">
						<h3 className="!mb-1">Message</h3>
						<textarea
							value={message}
							onChange={handleMessageChange}
							placeholder="Enter your message"
							rows="3"
							className="w-full border !font-medium border-slate-500 rounded-lg px-3 p-2 mb-3 !outline-none"
							required
						/>
					</div>
				) }
							
				{/* Upload Files Section */}
				{(selectedMethod !== "sms" && (selectedTemplate?.image || selectedTemplate?.video || selectedTemplate?.pdf) ) ? (
					<div className="uploaded-files-list px-5 mb-5">
						<div className="flex items-center mb-2 gap-4">
							<h3>Uploaded File</h3>
							{selectedFile === null && (
								<button
									type="button"
									onClick={fetchFiles}
									className="text-primary bg-white border border-primary text-sm rounded-lg px-3 py-1.5 font-semibold flex gap-2 items-center justify-center">
									<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
										<path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									Upload File
								</button>
							)}
						</div>
						{selectedFile !== null && (
							<div className="flex !mt-0">
								<div className="flex flex-row w-full items-center justify-between text-base font-normal">
									<div className="flex items-center justify-start gap-3">
										{selectedFile.fileType.startsWith(
											"image/"
										) ? (
											<img
												src={selectedFile.url}
												alt=""
												className="w-auto h-24 rounded-lg object-cover"
											/>
										) : selectedFile.fileType.startsWith(
												"video/"
										  ) ? (
											<video
												className="w-auto h-24 rounded-lg object-cover"
												controls>
												<source
													src={selectedFile.url}
													type={
														selectedFile.fileType
													}
												/>
											</video>
										) : (
											<div className="flex flex-col items-center justify-center ml-2">
												<AiFillFilePdf
													size={60}
													className="text-primary"
												/>
												<p className="text-sm font-semibold text-primary">
													{selectedFile.name}
												</p>
											</div>
										)}
										{selectedFile.fileType.startsWith(
											"application/pdf"
										)
											? ""
											: selectedFile.name}
									</div>
									<button
										className="bg-red-500 hover:bg-red-700 text-xs text-white font-semibold py-1 px-3 rounded-full h-fit"
										onClick={() => handleRemoveFile()}>
										Remove
									</button>
								</div>
							</div>
						)}
					</div>
				) : ("")}

				{/* Submit Button */}
				<button
					type="submit"
					className="mx-5 mb-5 capitalize !self-end px-5 py-2 bg-primary text-white border-none rounded-lg cursor-pointer disabled:opacity-50 disabled:hover:cursor-not-allowed"
					onClick={handleSendMessage}
					disabled={(selectedTemplate === null && selectedMethod !== "sms") || message === "" || ((selectedTemplate.image || selectedTemplate.video || selectedTemplate.pdf) && selectedFile === null)}>
					Send {selectedMethod}
				</button>
			</div>

			{showFilePopup && (
				<div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_0.5)] flex justify-center items-center z-10 custom-scrollbar">
					<div className="bg-[white] p-[20px] rounded-[10px] w-full max-w-[600px] max-h-[80%]">
						<h2 className="text-4xl font-bold">Select File ({getTrueKey()})</h2>
						<div className="flex flex-wrap gap-y-1 gap-3 mt-5 custom-scrollbar h-[400px] overflow-y-scroll">
							{availableFiles.filter((file) => file.fileType.includes(getTrueKey())).map((file, index) => (
								<div
									key={index}
									className={`file-item cursor-pointer ${
										selectedFile?.key === file.key
											? "selected"
											: ""
									}`}
									onClick={() => handleFileSelect(file)}>
									{file.fileType.startsWith("image/") && (
										<div className="w-full h-full relative">
											<img
												src={file.url}
												alt={file.name}
												className="w-full h-44 object-cover rounded-xl"
											/>
											<button
												type="button"
												className={`rounded-full ${
													selectedFile?.key ===
													file.key
														? "button-selected"
														: ""
												}`}
												onClick={() =>
													handleFileSelect(file)
												}></button>
										</div>
									)}
									{file.fileType.startsWith("video/") && (
										<div className="relative">
											<video
												className={`mainimgs rounded-xl ${
													selectedFile?.key ===
													file.key
														? "selected"
														: ""
												}`}
												controls>
												<source
													src={`${file.url}`}
													type={file.fileType}
												/>
												Your browser does not support
												the video tag.
											</video>
											<button
												className={`${
													selectedFile?.key ===
													file.key
														? "button-selected"
														: ""
												}`}
												onClick={() =>
													handleFileSelect(file)
												}></button>
										</div>
									)}
									{file.fileType.startsWith("application") && (
										<div className="pdf-icon">
											<AiFillFilePdf size={50} />
											<p className="pdf-file-font-size">
												{file.name}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
						<button
							onClick={() => setShowFilePopup(false)}
							className="mt-4 text-primary bg-white rounded-md px-3 py-2 border-2 hover:bg-primary/10 transition-all duration-300 border-primary font-semibold flex items-center justify-center">
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SendMessagePopup;
