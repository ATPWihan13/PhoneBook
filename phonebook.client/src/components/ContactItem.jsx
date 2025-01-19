import React from "react";
import { FaPhoneAlt, FaEnvelope, FaEdit, FaTrashAlt } from "react-icons/fa";

function ContactItem({ contact, onEdit, onDelete }) {
    return (
        <div className="contact-item">
            <strong className="contact-name">{contact.name}</strong>
            <div className="details-row">
                <div className="contact-details">
                    <div className="detail-item">
                        <FaPhoneAlt className="icon" />
                        <span>{contact.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                        <FaEnvelope className="icon" />
                        <span>{contact.emailAddress || "N/A"}</span>
                    </div>
                </div>
                <div className="button-row">
                    <button onClick={() => onEdit(contact)}>
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => {
                            if (!contact.contactId) {
                                console.error("Contact ID is undefined:", contact);
                                return;
                            }
                            console.log("Deleting contact with ID:", contact.contactId);
                            onDelete(contact.contactId);
                        }}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactItem;

