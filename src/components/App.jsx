import {useState,useEffect} from "react";
import { nanoid } from 'nanoid';
import { useDispatch,useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Form from './Form';
import ContactList from "./ContactList";
import Filter from "./Filter";

import {increment,decrement} from '../redux/store'



function App() {
  
  const value = useSelector(state => state.myValue);
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState(()=>JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

   useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
   }, [contacts])


  
  const deleteContact = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
      };


  const formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    };

    setContacts(prevState => [contact, ...prevState]
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);    
   };

  
  const normalizedFilter = filter.toLocaleLowerCase();
  const filtredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

    return (
      <div>
        <h2>{value}</h2>
        <button onClick={()=>dispatch(increment(1))}>increment</button>
        <button onClick={()=>dispatch(decrement(1))}>decrement</button>

        <h1>Phonebook</h1>
        <Form onSubmit={formSubmitHandler}/>        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter}/>
        <ContactList contacts={filtredContacts} onDeleteContact={deleteContact}/>
      </div>
    )
  

};

App.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(PropTypes.shape),
};

export default App;