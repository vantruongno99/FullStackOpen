import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newNumber, setNewNumber] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilter , setFilter] = useState(''); 
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value);
  }
  
  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()))
        
  const addPerson = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number : newNumber
    };
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <PersonForm  onSubmit={addPerson} newName ={newName} handleNameChange ={handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App