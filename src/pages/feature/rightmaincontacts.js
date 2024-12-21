import React, { useState, useEffect } from "react";
import "./rightmaincontacts.css";
import { useNavigate, Link } from "react-router-dom";
import SendMessagePopup from "./SendMessagePopup";
import axios from "axios";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ContactDropdown from "./contactDropdown";
import useContactSearch from "../../utils/useContactSearch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactComponent as FilterIcon } from "../../image/filter.svg";
import { ReactComponent as PlusIcon } from "../../image/addcon.svg";
import { ReactComponent as PersonIcon } from "../../image/account.svg";
import { ReactComponent as SendIcon } from "../../image/send.svg";
import { ReactComponent as DeleteIcon } from "../../image/deleteb.svg";
import { ReactComponent as ContactsIcon } from "../../image/contacts.svg";

import not_found from "../../image/404.svg";
import more from "../../image/more.svg";

const Rightmaincontacts = () => {
	const navigate = useNavigate();
	const { searchQuery, filteredContacts, handleSearch } = useContactSearch();

	const [contacts, setContacts] = useState([]);
	const [contactIdMessageLimitReached, setContactIdMessageLimitReached] =
		useState(null);
	const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [selectedContacts, setSelectedContacts] = useState([]);
	const [openDropdown, setOpenDropdown] = useState(null);
	const [showMessageSentNotification, setShowMessageSentNotification] =
		useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	const [userId, setUserId] = useState(null);
	const [contactToMessage, setContactToMessage] = useState(null);
	const [additionalFields, setAdditionalFields] = useState([]);

	useEffect(() => {
		axios
			.get("/api/v1/current_user_client_form")
			.then((res) => {
				if (res.data.form.additional_fields) {
					let initialFormData = [];
					Object.entries(res.data.form.additional_fields).map(
						(entry) => initialFormData.push(entry[0])
					);
					setAdditionalFields(initialFormData);
				}
			})
			.catch((err) => console.log(err));

		const user_id = localStorage.getItem("user_id");
		if (user_id === null) {
			const errorToast = toast.error("Please login to access this page.");
			setTimeout(() => {
				toast.dismiss(errorToast);
				navigate("/login");
			}, 1500);
		}
		setUserId(user_id);
	}, []);

	useEffect(() => {
		// Update local state when filteredContacts change
		setContacts(filteredContacts);
	}, [filteredContacts]);

	useEffect(() => {
		const limitReachedContacts = selectedContacts.filter((contactId) => {
			const contact = filteredContacts.find(
				(contact) => contact.id === contactId
			);
			return contact && contact.message_limit === 0;
		});
		setContactIdMessageLimitReached(limitReachedContacts);
	}, [selectedContacts, filteredContacts]);

	const handleAddconClick = () => {
		navigate("/vendor/contact/add-contact");
	};

	const handleSendButtonClick = () => {
		setShowSendMessagePopup(true);
	};

	const handleCloseSendMessagePopup = () => {
		setShowSendMessagePopup(false);
	};

	const handleDeleteButtonClick = () => {
		setShowDeleteConfirmation(true);
	};

	const handleDeleteCancel = () => {
		setShowDeleteConfirmation(false);
	};

	const handleSelectAllChange = () => {
		const newSelectAll = !selectAll;
		setSelectAll(newSelectAll);
		if (newSelectAll) {
			setSelectedContacts(filteredContacts.map((contact) => contact.id));
		} else {
			setSelectedContacts([]);
		}
	};

	const handleContactCheckboxChange = (contactId) => {
		setSelectedContacts((prevSelected) =>
			prevSelected.includes(contactId)
				? prevSelected.filter((id) => id !== contactId)
				: [...prevSelected, contactId]
		);
		checkSelectedContactsMessageLimitReached();
	};

	const checkSelectedContactsMessageLimitReached = () => {
		const limitReachedContacts = selectedContacts.filter((contactId) => {
			const contact = filteredContacts.find(
				(contact) => contact.id === contactId
			);
			return contact && contact.message_limit === 0;
		});
		setContactIdMessageLimitReached(limitReachedContacts);
	};

	const handleDeleteConfirm = async () => {
		try {
			selectedContacts.every(async (contactId) => {
				await axios.delete("/api/v1/clients/" + contactId);
			});
			setSelectedContacts([]);
			setSelectAll(false);
			setShowDeleteConfirmation(false);
			toast.success("Contacts deleted successfully.");
			window.location.reload();
		} catch (error) {
			console.error("Error deleting contacts:", error);
			toast.error("Error deleting contacts.");
		}
	};

	const handleSendMessage = (contactId) => {
		const contactToSend = filteredContacts.find(
			(contact) => contact.id === contactId
		);
		setContactToMessage(contactToSend);
		setShowSendMessagePopup(true);
	};

	const handleEditContact = (contactId) => {
		const contactToEdit = filteredContacts.find(
			(contact) => contact.id === contactId
		);
		navigate("/contact/add-contact", { state: { contact: contactToEdit } });
		setOpenDropdown(null);
	};

	const handleDropdownToggle = (contactId) => {
		if (openDropdown === contactId) {
			setOpenDropdown(null);
		} else {
			setOpenDropdown(contactId);
		}
	};

	const showNotification = (message) => {
		setNotificationMessage(message);
		setShowMessageSentNotification(true);
		setTimeout(() => {
			setShowMessageSentNotification(false);
		}, 5000);
	};

	return (
		<div className="w-full">
			<div className="flex flex-col justify-between mt-2">
				<div className="firstsection">
					<div className="flex items-center justify-center gap-2">
						<ContactsIcon className="w-7 h-7 text-black" />
						<h1 className="text-3xl font-bold">Contacts</h1>
					</div>
					<div className="flex gap-3 w-auto">
						<button className="flex items-center gap-2 border border-primary text-primary text-sm px-3 py-1.5 rounded-lg font-normal">
							<FilterIcon className="text-primary w-4 h-4" />
							Filter
						</button>
						<button
							className="bg-primary text-white px-2.5 py-2 rounded-lg text-sm flex items-center font-normal gap-1"
							onClick={handleAddconClick}>
							<PlusIcon className="text-white w-4 h-4" /> Add
							Contact
						</button>
						<Link to={"/vendor/profile"} className="w-10 h-10">
							<PersonIcon />
						</Link>
					</div>
				</div>

				<div className="secondsection mt-3">
					<div className="flex gap-3">
						<button className="right-btn-text-all">
							All Contacts
						</button>
						<button className="right-btn-text-new">
							New Contacts
						</button>
					</div>
					<div className="flex gap-3 ">
						<button
							className={`disabled:cursor-not-allowed group relative w-fit whitespace-nowrap px-4 py-1.5 text-sm font-semibold rounded-lg bg-[#e9e9e9] flex items-center justify-center gap-2 !z-0`}
							onClick={handleSendButtonClick}>
							<SendIcon />
							<span className="group-disabled:opacity-50 ">
								Send
							</span>
						</button>
						<button
							onClick={handleDeleteButtonClick}
							className="w-fit whitespace-nowrap px-4 py-1.5 text-sm font-semibold rounded-lg bg-[#e9e9e9] flex items-center justify-center gap-2">
							<DeleteIcon /> Delete
						</button>
					</div>
				</div>

				<div className="thirdhorizontalline"></div>

				<div className="forthmainsection">
					<div className="mainplate">
						<input
							type="checkbox"
							className="maincheckbtn"
							checked={selectAll}
							onChange={handleSelectAllChange}
						/>
						<input
							type="text"
							placeholder="Search by name"
							className="search-input-right-main"
							value={searchQuery}
							onChange={(e) => handleSearch(e.target.value)}
						/>
						<h1 className="mainname-id">ID No.</h1>
						<h1 className="mainname mainname-email">Email</h1>
						<h1 className="mainname mainname-number">
							Phone Number
						</h1>
						<h1 className="mainname mainname-date">Created Date</h1>
						{/* {additionalFields.map((field, idx) => {
                        return <h1 key={idx} className={`mainname mainname-additional-fields`}>{field}</h1>
                    })} */}
						<h1 className="mainname mainname-more">More</h1>
					</div>
					{contacts.length > 0 ? (
						contacts.map((contact) => (
							<div className="localplate" key={contact.id}>
								<input
									type="checkbox"
									className="localcheckbtn"
									checked={selectedContacts.includes(
										contact.id
									)}
									onChange={() =>
										handleContactCheckboxChange(contact.id)
									}
								/>
								<h1 className="localname localname-name">
									{contact.name}
								</h1>
								<h1 className="localname localname-id">
									{contact.id}
								</h1>
								<h1 className="localname localname-email">
									{contact.email}
								</h1>
								<h1 className="localname localname-phone">
									{contact.mobile_number}
								</h1>
								<h1 className="localname localname-date">
									{new Date(
										contact.created_at
									).toLocaleString("en-US")}
								</h1>
								<button
									className="localmorebtn localname-more relative"
									onClick={() =>
										handleDropdownToggle(contact.id)
									}>
									<img src={more} alt="more" className="" />
								</button>
								{openDropdown === contact.id && (
									<ContactDropdown
										contactId={contact.id}
										onSendMessage={handleSendMessage}
										onEditContact={handleEditContact}
									/>
								)}
							</div>
						))
					) : (
						<h1 className="mt-4 bg-primary/20 text-4xl text-primary w-full flex flex-col items-center justify-center h-auto px-6 py-8 pt-2 border-2 border-dashed border-primary rounded-lg">
							<img
								src={not_found}
								className="h-48 w-auto -mb-3"
								alt=""
							/>
							No Contacts Found
							<span className="text-lg font-normal mt-1 mb-5">
								Please add some contacts first to send messages
							</span>
							<Link
								to={"/vendor/contact/add-contact"}
								className="text-lg font-normal px-3 py-2 rounded-lg bg-primary text-white flex items-center justify-center gap-1.5">
								<PlusIcon className="text-white w-6 h-6" /> Add
								Contact
							</Link>
						</h1>
					)}
				</div>

				{showSendMessagePopup && (
					<SendMessagePopup
						onClose={handleCloseSendMessagePopup}
						selectedContacts={
							contactToMessage
								? [contactToMessage]
								: filteredContacts.filter((contact) =>
										selectedContacts.includes(contact.id)
								  )
						}
						showNotification={showNotification}
						userId={userId}
					/>
				)}
				{showDeleteConfirmation && (
					<DeleteConfirmationPopup
						onConfirm={handleDeleteConfirm}
						onCancel={handleDeleteCancel}
						className="delete-btn-show-pop-up"
					/>
				)}
				{showMessageSentNotification && (
					<div className="notification">{notificationMessage}</div>
				)}
			</div>
		</div>
	);
};

export default Rightmaincontacts;
