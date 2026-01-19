
import { useState, useEffect } from 'react'
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import { nanoid } from 'nanoid';
import './App.css'



function App() {
    const loadContacts = () => {
    const savedContacts = localStorage.getItem('contacts')
    return savedContacts ? JSON.parse(savedContacts) : []
  }

  const [contacts, setContacts] = useState(loadContacts());
  const [filter, setFilter] = useState('');


  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updatedContacts)
  }
 useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }, [contacts]) 

 const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

 const errorMessage = filter && filteredContacts.length === 0 
    ? 'No contacts found' 
    : null; // or ''

   const handleCreate = (contact) => {
    const newContact = { id: nanoid(), ...contact }
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
  }

  return (
  <div >
  <h1>Phonebook</h1>
  <ContactForm handleCreate={handleCreate} />
  <SearchBox filter={filter} setFilter={setFilter}/>
  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  <ContactList contacts={filteredContacts} onDelete={handleDelete} />
</div>

  )
}

export default App
