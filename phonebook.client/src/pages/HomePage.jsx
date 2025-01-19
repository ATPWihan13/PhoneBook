import { useState, useEffect } from "react";
import { getContacts, searchContacts, deleteContact } from "../services/api";
import SearchBar from "../components/SearchBar";
import ContactList from "../components/ContactList";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [contacts, setContacts] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const data = await getContacts();
            setContacts(data);

            // Check if no contacts are found and update the noResults state
            setNoResults(data.length === 0);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
            setNoResults(true);
        } finally {
            setLoading(false); // Set loading to false when fetching completes
        }
    };

    const handleSearch = async (query) => {
        setNoResults(false); // Reset noResults before searching

        try {
            const data = await searchContacts(query);
            setContacts(data);
            setNoResults(data.length === 0);
        } catch (error) {
            console.error("Search error:", error);
            setNoResults(true);
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            console.error("Attempted to delete a contact with an undefined ID.");
            return;
        }
        try {
            await deleteContact(id);
            await fetchContacts();
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    };

    return (
        <div className="page">
            {loading ? ( // Display loader if loading
                <div className="loader">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                        <radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                            <stop offset="0" stopColor="#FFFFFF" />
                            <stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9" />
                            <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6" />
                            <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3" />
                            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                        </radialGradient>
                        <circle
                            transformorigin="center"
                            fill="none"
                            stroke="url(#a9)"
                            strokeWidth="15"
                            strokeLinecap="round"
                            strokeDasharray="200 1000"
                            strokeDashoffset="0"
                            cx="100"
                            cy="100"
                            r="70"
                        >
                            <animateTransform
                                type="rotate"
                                attributeName="transform"
                                calcMode="spline"
                                dur="2"
                                values="360;0"
                                keyTimes="0;1"
                                keySplines="0 0 1 1"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle
                            transformorigin="center"
                            fill="none"
                            opacity=".2"
                            stroke="#FFFFFF"
                            strokeWidth="15"
                            strokeLinecap="round"
                            cx="100"
                            cy="100"
                            r="70"
                        />
                    </svg>
                </div>
            ) : (
                <>
                    <div className="search-row">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="add-contact">
                        <button className="add-contact-button" onClick={() => navigate("/add")}>
                            + Add Contact
                        </button>
                    </div>
                    {/* Show message if no contacts found */}
                    {noResults ? (
                        <p className="text-center text-danger">No Contacts Found</p>
                    ) : (
                        <ContactList
                            contacts={contacts}
                            onEdit={(contact) => navigate(`/edit/${contact.contactId}`)}
                            onDelete={handleDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;

