import React, { useState } from "react";
import RightAddconForm from "./rightaddconform";
import "./rightmainaddcontacts.css";
import { ReactComponent as ImportIcon } from "../../image/importi.svg";
import Papa from "papaparse";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightmainAddContact = () => {
	const [csvData, setCsvData] = useState([]);
	console.log(csvData)

	const handleImportClick = () => {
		document.getElementById("csvFileInput").click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			Papa.parse(file, {
				header: true,
				complete: (result) => {
					// Filter out records with missing required fields
					const filteredData = result.data.filter(
						(contact) =>
							contact.name &&
							contact.email &&
							contact.phone &&
							contact.occupation &&
							contact.loan
					);
					setCsvData(filteredData);
					console.log(filteredData); // Check the parsed and filtered data
					// uploadCsvData(filteredData);
				},
				error: (error) => {
					console.error("Error parsing CSV file:", error);
					toast.error("Error parsing CSV file.");
				},
			});
		}
	};

	// const uploadCsvData = async (data) => {
	//     try {
	//         const response = await axios.post('/api/contacts/import', data.map(contact => ({ ...contact })));

	//         console.log(response.data); // Check the response format
	//         toast.success("CSV data uploaded successfully!");

	//         // Update your frontend state or UI as needed
	//         if (response.data.result) {
	//             setCsvData(response.data.result);
	//         }

	//         // Clear csvData state after successful import
	//         setCsvData([]);

	//     } catch (error) {
	//         console.error("Error uploading CSV data:", error);
	//         toast.error("Error uploading CSV data.");
	//     }
	// };

	return (
		<div className="w-full h-full mt-2">
			<div className="w-full flex items-center justify-between gap-4 px-3">
				<h1 className="text-3xl">Add Contact</h1>
				<div className="flex gap-2">
					{/* <button className="flex items-center gap-2 border border-primary text-primary text-sm px-3 py-1.5 rounded-lg font-normal">
						<FilterIcon className="text-primary w-4 h-4" /> Filter
					</button>
					{/* <button
						className="bg-primary text-white px-2.5 py-2 rounded-lg text-sm flex items-center font-normal gap-1"
						onClick={handleAddconClick}>
						<PlusIcon className="text-white w-4 h-4" /> Add Contact
					</button> */}
					<div>
						<button
							className="bg-primary text-white w-full flex px-4 py-2 rounded-lg text-sm items-center gap-1 font-normal"
							onClick={handleImportClick}>
							<ImportIcon className="w-3 h-3 text-white" /> Import
							Contacts
						</button>
						<input
							type="file"
							id="csvFileInput"
							accept=".csv"
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
					</div>
				</div>
			</div>

			{/* Horizontal Line */}
			<div className="w-full h-[1.5px] bg-gray-700 my-5" />
			{/* End Horizontal Line */}

			<RightAddconForm />
		</div>
	);
};

export default RightmainAddContact;
