const API_BASE_URL = "http://localhost:5046/api/Contacts";


const handleResponse = async (response) => {
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetails}`);
    }

    // Check for 204 No Content response
    if (response.status === 204) {
        return null; // Return null for no content and handle it in the calling function
    }

    return response.json();
};

export const getContacts = async (retries = 3) => {
    try {
        const response = await fetch(API_BASE_URL);

        const data = await handleResponse(response);
        console.log("Fetched contacts:", data);
        return data;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying to fetch contacts. Attempts left: ${retries}`);
            return getContacts(retries - 1); // Retry fetching contacts
        } else {
            console.error("Failed to fetch contacts:", error);
            throw error;
        }
    }
};


export const getContactById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Failed to fetch contact with ID ${id}:`, error);
        throw error;
    }
};

export const searchContacts = async (query) => {
    try {
        const params = new URLSearchParams(query).toString();
        const response = await fetch(`${API_BASE_URL}/Search?${params}`);
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to search contacts:", error);
        throw error;
    }
};

export const addContact = async (contact) => {
    if (contact.email === null || contact.email === '') {
        delete contact.email;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to add contact:", error);
        throw error;
    }
};

export const updateContact = async (id, contact) => {
    if (contact.email === null || contact.email === '') {
        delete contact.email;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Failed to update contact with ID ${id}:`, error);
        throw error;
    }
};

export const deleteContact = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
        });

        // Handle response with no content
        handleResponse(response);  // This now properly handles no content response

    } catch (error) {
        console.error(`Failed to delete contact with ID ${id}:`, error);
        throw error;
    }
};

