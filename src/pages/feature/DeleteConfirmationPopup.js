import React from 'react';
import "./DeleteConfirmationPopup.css"; // Assuming you have CSS file for styling the popup

const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="delete-confirmation-popup">
            <div className="popup-content">
                <h2 className="askmessageh2">Are you sure you want to delete?</h2>
                <div className="button-container">
                    <button className="confirm-button" onClick={onConfirm}>Delete</button>
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;
