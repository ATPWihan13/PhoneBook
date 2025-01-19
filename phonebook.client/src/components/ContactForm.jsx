import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

function ContactForm({ initialContact, onSubmit }) {
    const [contact, setContact] = useState(initialContact || { name: "", phoneNumber: "", emailAddress: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contact);
    };

    return (
        <div className="form-container">
            <h1>{initialContact ? 'Edit Contact' : 'Add Contact'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <FaUser className="form-icon" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <FaPhone className="form-icon" />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={contact.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <FaEnvelope className="form-icon" />
                    <input
                        type="email"
                        name="emailAddress"
                        placeholder="Email Address"
                        value={contact.emailAddress}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
}

export default ContactForm;
