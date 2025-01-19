import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaArrowLeft } from "react-icons/fa";

function EditContactPage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            const response = await fetch(`/api/Contacts/${id}`);
            if (response.ok) {
                const contact = await response.json();
                setName(contact.name);
                setPhoneNumber(contact.phoneNumber);
                setEmailAddress(contact.emailAddress || '');
            } else {
                alert('Failed to fetch contact details.');
            }
        };

        fetchContact();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set emailAddress to null if it's an empty string
        const finalEmailAddress = emailAddress.trim() === '' ? null : emailAddress;

        const updatedContact = { contactId: id, name, phoneNumber, emailAddress: finalEmailAddress };

        const response = await fetch(`/api/Contacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedContact),
        });

        if (response.ok) {
            alert('Contact updated successfully!');
            navigate('/');
        } else {
            alert('Failed to update contact. Please try again.');
        }
    };

    return (   
        <div className="page form-page">
            <div className="back-arrow" onClick={() => navigate('/')}>
                <FaArrowLeft size={12}  />
                <span>Back to Home</span>
            </div>
            <div className="form-container">
                <h1>Edit Contact</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FaUser className="form-icon" />
                        <input
                            type="text"
                            placeholder="Fullname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FaPhone className="form-icon" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <FaEnvelope className="form-icon" />
                        <input
                            type="email"
                            placeholder="Optional: Email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                    <div className="submit-row">
                        <button type="submit" className="submit-button">Save Changes</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default EditContactPage;
