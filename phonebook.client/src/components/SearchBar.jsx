import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSearch = () => {
        onSearch({ name, phoneNumber });
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="search-input"
            />
            <div className="separator" />
            <input
                type="text"
                placeholder="Search by phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="search-input"
            />
            <button className="search-button" onClick={handleSearch}>
                <FaSearch />
            </button>
        </div>
    );
}

export default SearchBar;
