import Contact from "../Contact/Contact"
import { useSelector, useDispatch } from "react-redux"
import { deleteContact } from "../../redux/contactsSlice"
import styles from "./ContactList.module.css"

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items)
  const filter = useSelector(state => state.filters.name.toLowerCase())
  const dispatch = useDispatch()

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  if (filteredContacts.length === 0) {
    return <p className={styles.empty}>No contacts found.</p>;
  }

  return (
    <ul className={styles.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          onDelete={() => dispatch(deleteContact(id))}
        />
      ))}
    </ul>
  )
}

export default ContactList
