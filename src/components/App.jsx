import { useDispatch,useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Form from './Form';
import ContactList from "./ContactList";
import Filter from "./Filter";
import { addContact,changeFilter,deleteContact } from '../redux/store';



function App() {  
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const onDeleteContact = name => dispatch(deleteContact(name));
  
  const formSubmitHandler = data => {   

    if (contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return;
    };
    
    dispatch(addContact(data));
    
  };

  const changerFilter = event => {
    dispatch(changeFilter(event.currentTarget.value));     
   };

  
  const normalizedFilter = filter.toLocaleLowerCase();
  const filtredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

    return (
      <div>     
        <h1>Phonebook</h1>
        <Form onSubmit={formSubmitHandler}/>        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changerFilter}/>
        <ContactList filtredContacts={filtredContacts} onDeleteContact={onDeleteContact}/>
      </div>
    )
};

App.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(PropTypes.shape),
};

export default App;