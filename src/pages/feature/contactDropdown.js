import React from "react";
import "./contactDropdown.css";

import send_private from "../../image/send_private.svg";
import edit_private from "../../image/edit_private.svg";

const ContactDropdown = ({ contactId, onSendMessage, onEditContact }) => {
	return (
		<div className="dropdown-menu">
			<button onClick={() => onSendMessage(contactId)}>
				<img src={send_private} alt="" />
				Send Message
			</button>
			<button onClick={() => onEditContact(contactId)}>
				<img src={edit_private} alt="" /> Edit Contact
			</button>
		</div>
	);
};

export default ContactDropdown;
