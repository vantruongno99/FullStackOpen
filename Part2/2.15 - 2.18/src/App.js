import React, { useState , useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
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

    const hook = () => {
    personService
        .getAll()
        .then(res => 
            setPersons(res)
        )
}

     useEffect(hook, [])
  
  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()))

        const checkInput = () => {
          if (newName.trim() === '' || newNumber.length < 3) return false
  
          const findedPerson = persons.find(person => person.name === newName)
  
          if (findedPerson) {
              const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
              if (result) {
                  const newPerson = {
                      id: findedPerson.id,
                      name: newName,
                      number: newNumber
                  }
                  handleOnUpdate(newPerson)
              }
              return false
          }
          return true
      }
        
  const addPerson = (event) => {
    event.preventDefault()
    if (checkInput()) {
        const personObj = {
            name: newName,
            number: newNumber
        }
        personService
            .create(personObj)
            .then((createdPerson) => {
                setPersons(persons.concat(createdPerson))
                setTimeout(() => {
                }, 5000)
            })
            .catch(error => {
                setTimeout(() => {
                }, 5000)
            })
    }
  };

  const deletePerson = (person)=>
  {
    const res = window.confirm(`Delete ${person.name}`)
    if(res){
      personService.Delete(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handleOnUpdate = (updatedPerson) =>
  {
    personService.update(updatedPerson.id,updatedPerson).then(personData => {
      let newListPersons = persons.map(person => person.name === personData.name ? personData : person)
      setPersons(newListPersons)
      setFilter(newListPersons)
  }).catch((error) => {
    alert(error)
    setPersons(persons.filter(p => p.id !== updatedPerson.id))
    setTimeout(() => {
    }, 5000)
})
  }

  return (
    <div>
      <h2>Phone book</h2>
      <Filter filter={newFilter} onChange={handleFilterChange}/>
      <h2>Add a new number</h2>
      <PersonForm  onSubmit={addPerson} newName ={newName} handleNameChange ={handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleOnDelete = {deletePerson} />
    </div>
  )
}

export default App