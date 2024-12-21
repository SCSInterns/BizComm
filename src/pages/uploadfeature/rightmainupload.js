import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useFileContext } from "../../contexts/FileContext";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";
import { AiFillFilePdf } from "react-icons/ai";
import "./rightmainupload.css";
import "react-toastify/dist/ReactToastify.css";
import { UploadIcon } from "lucide-react";

// import { ReactComponent as UploadIcon } from "../../image/upload_send.svg"
import not_found from "../../image/404.svg";

const RightmainUpload = () => {
	const { uploadedFiles, setUploadedFiles, selectedFiles, setSelectedFiles } =
		useFileContext();
	const [uploadError, setUploadError] = useState(null);
	const [filterType, setFilterType] = useState("all");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [selectedUploadedFiles, setSelectedUploadedFiles] = useState([]);

	const fetchUploadedFiles = useCallback(async () => {
		try {
			const response = await axios.get("/api/v1/get_files");
			setUploadedFiles(response.data.files);
		} catch (error) {
			console.error("Error fetching uploaded files:", error);
			toast.error(`Error fetching uploaded files: ${error.message}`);
		}
	}, [setUploadedFiles]);

	useEffect(() => {
		fetchUploadedFiles();
	}, [fetchUploadedFiles]);

	const handleFileChange = (event) => {
		let files = Array.from(event.target.files);
		console.log(files);
		files.forEach((file) => {
			if (file.size > 5000000) {
				toast.error("File size should be less than 5MB.");
				event.target.value = "";
				setSelectedUploadedFiles([]);
				// setUploadError("File size should be less than 10MB.");
				return;
			}
		});
		const allowedTypes = ["image/*", "video/*", "application/*"];
		const filteredFiles = Array.from(files).filter((file) =>
			allowedTypes.some((type) => file.type.match(type))
		);
		setSelectedFiles(filteredFiles);
		console.log(selectedFiles);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		selectedFiles.forEach((file) => {
			formData.append("upload_file[files][]", file);
		});

		try {
			const response = await axios.post("api/v1/upload_file", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			toast.success(response.data.message);
			fetchUploadedFiles();
			setSelectedFiles([]);
			setShowSuccessMessage(true);
			setTimeout(() => setShowSuccessMessage(false), 3000);
		} catch (error) {
			console.error("Error uploading files:", error);
			toast.error(
				`Error uploading files: ${
					error.response?.data?.message ||
					"An error occurred while uploading files."
				}`
			);
			setUploadError(error)
		}
	};

	const handleFilter = (type) => {
		setFilterType(type);
	};

	const handleSelectFile = (fileKey) => {
		setSelectedUploadedFiles((prev) =>
			prev.includes(fileKey)
				? prev.filter((key) => key !== fileKey)
				: [...prev, fileKey]
		);
		console.log(selectedUploadedFiles);
	};

	const handleSelectAll = () => {
		if (selectedUploadedFiles.length === filteredFiles.length) {
			setSelectedUploadedFiles([]);
		} else {
			setSelectedUploadedFiles(filteredFiles.map((file) => file.key));
		}
	};

	const handleDeleteSelected = async () => {
		try {
			await axios
				.post(
					`api/v1/delete_uploaded_files/${localStorage.getItem(
						"user_id"
					)}`,
					{ files: selectedUploadedFiles }
				)
				.then(() => fetchUploadedFiles());
			setUploadedFiles((prev) =>
				prev.filter((file) => !selectedUploadedFiles.includes(file.key))
			);
			setSelectedUploadedFiles([]);
		} catch (error) {
			console.error("Error deleting files:", error);
			toast.error(`Error deleting files: ${error.message}`);
		}
	};

	const filteredFiles = uploadedFiles.filter((file) => {
		if (filterType === "all") return true;
		if (filterType === "image" && file.fileType.startsWith("image/"))
			return true;
		if (filterType === "video" && file.fileType.startsWith("video/"))
			return true;
		if (filterType === "pdf" && file.fileType.startsWith("video/"))
			return true;
		return false;
	});

	return (
		<div className="w-full">
			{showSuccessMessage && (
				<SuccessMessage message="Files uploaded successfully!" />
			)}
			<div className="firstsectionupload">
				<div className="flex items-center justify-center gap-2 mb-3">
					<UploadIcon className="size-7" />
					<h1 className="text-3xl">Upload</h1>
				</div>
				<div className="flex items-center justify-center gap-2">
					<div className="btn-upload">
						<label htmlFor="file-input" className="w-auto bg-white text-primary border border-primary text-lg rounded-lg px-3 py-1.5 font-semibold cursor-pointer">
							Add files
						</label>
						<input
							id="file-input"
							name="file-input"
							type="file"
							onChange={handleFileChange}
							style={{ display: "none" }}
							multiple
						/>
					</div>
					<button className="w-auto bg-primary text-white text-lg rounded-lg px-3 py-1 cursor-pointer" onClick={handleUpload}>
						Upload
					</button>
				</div>
			</div>
			<div className="secondsectionupload">
				<div className="second-btn flex gap-2">
					<button
						onClick={() => handleFilter("all")}
						className={filterType === "all" ? "active" : ""}>
						All
					</button>
					<button
						onClick={() => handleFilter("image")}
						className={filterType === "image" ? "active" : ""}>
						Image
					</button>
					<button
						onClick={() => handleFilter("video")}
						className={filterType === "video" ? "active" : ""}>
						Video
					</button>
					<button
						onClick={() => handleFilter("pdf")}
						className={filterType === "pdf" ? "active" : ""}>
						Pdf
					</button>
				</div>
				<div className="horizontalline-this"></div>
			</div>
			<div className="selected-files">
				{selectedFiles.map((file, index) => (
					<div key={index} className={`file-item`}>
						<span>{file.name}</span>
					</div>
				))}
			</div>

			<div className="uploaded-files-actions">
				<button onClick={handleSelectAll}>
					{selectedUploadedFiles.length === filteredFiles.length
						? "Unselect All"
						: "Select All"}
				</button>
				<button
					onClick={handleDeleteSelected}
					disabled={selectedUploadedFiles.length === 0}>
					Delete Selected
				</button>
			</div>

			<div className="uploaded-files">
				{filteredFiles.length > 0 ? (
					filteredFiles.map((file, index) => (
						<div
							key={index}
							className={`file-item ${
								selectedUploadedFiles.includes(file.key)
									? "selected"
									: ""
							}`}>
							{file.fileType.startsWith("image/") && (
								<div>
									<img
										src={`${file.url}`}
										alt={file.fileName}
									/>
									<button
										type="button"
										className={`${
											selectedUploadedFiles.includes(
												file.key
											)
												? "button-selected"
												: ""
										}`}
										onClick={() =>
											handleSelectFile(file.key)
										}></button>
								</div>
							)}
							{file.fileType.startsWith("video/") && (
								<div className="relative">
									<video
										className={`mainimgs rounded-xl ${
											selectedUploadedFiles.includes(
												file.key
											)
												? "selected"
												: ""
										}`}
										controls>
										<source
											src={`${file.url}`}
											type={file.fileType}
										/>
										Your browser does not support the video
										tag.
									</video>
									<button
										className={`${
											selectedUploadedFiles.includes(
												file.key
											)
												? "button-selected"
												: ""
										}`}
										onClick={() =>
											handleSelectFile(file.key)
										}></button>
								</div>
							)}
							{file.fileType.startsWith("application") && (
								<div
									className="pdf-icon"
									onClick={() => handleSelectFile(file.key)}>
									<AiFillFilePdf
										className="pdf-viewer"
										size={100}
									/>
									<p className="pdf-file-font-size">
										{file.name}
									</p>
								</div>
							)}
						</div>
					))
				) : (
					<h1 className="bg-primary/20 text-4xl text-primary w-full flex flex-col items-center justify-center h-auto px-6 py-8 pt-2 border-2 border-dashed border-primary rounded-lg">
						<img
							src={not_found}
							className="h-48 w-auto -mb-3"
							alt=""
						/>
						No Files found
						<span className="text-lg font-normal mt-1 mb-5">
							Please add some files first to send messages
						</span>
					</h1>
				)}
			</div>

			{uploadError && <p className="error-message">{uploadError}</p>}
		</div>
	);
};

export default RightmainUpload;
