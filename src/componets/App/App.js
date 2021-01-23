import React, { Component } from 'react';
import './App.css';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import Filter from '../Filter ';
import { v4 as uuidv4 } from 'uuid';


class App extends Component {

  static defaultProps = {
    //   
  }
  static propTypes = {
   //
  }
  state = {
    contacts: [],
    filter: ''
  };
  
  
  addContact = ({name,number}) => {
    console.log({name,number});
    const contact = {
      id: uuidv4(),
      name,
      number
    }
    if(this.state.contacts.find(item=>item.name === name)){
      alert(`${name} is already in contacts`);
        return;
      };
    this.setState(({ contacts }) => ({
      contacts:[contact, ...contacts] 
      // contacts: contacts.includes(contact.name) ? alert('is slready') : [contact, ...contacts]   
     
    }))
    
  };
  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts:prevState.contacts.filter(contact => contact.id !== contactID),
    }));
    };
 
  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  }
  getchangeFilter = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();
    return (contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizeFilter)));
  };
  
  

  render() {
    const filter  = this.state.filter;
    const addContact = this.addContact;
    const filterResult = this.getchangeFilter();
    const deleteContact = this.deleteContact;
    return (
          <div>
      <h1>Phonebook</h1>
        <ContactForm onSubmit={ addContact}/>
      <h2>Contacts</h2>
        <Filter value={filter} onChange={ this.changeFilter}/> 
        <ContactList contactsList={filterResult}  onDelete={deleteContact}
        />
    </div>  
    )
  }

}
export default App;
