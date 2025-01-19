import ContactItem from './ContactItem';

function ContactList({ contacts, onEdit, onDelete }) {
    return (
        <div className="contact-list">
            {contacts.map((contact, index) => (
                <div key={contact.contactId}>
                    <ContactItem
                        contact={contact}
                        onEdit={onEdit}
                        onDelete={(id) => {
                            console.log("Contact passed to delete:", contact);
                            onDelete(id);
                        }}
                    />
                    {index < contacts.length - 1 && <hr />}
                </div>
            ))}
        </div>
    );
}

export default ContactList;


