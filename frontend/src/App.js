import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilter, setFilter] = useState('');
  const [notify, setNotify] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
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
      const person = {
        name: newName,
        number: newNumber
      }
      personService
        .create(person)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson))
          setNewNumber('')
          setNewName('')
          setNotify(`${person.name} has been added`)
          setTimeout(() => {
          setNotify(null)}, 5000)
        })
        .catch(error => {
          setNotify(error.response.data.error);
          setTimeout(() => {
            setNotify(null)
          }, 5000)
        })
    }
  };

  const deletePerson = (person) => {
    const res = window.confirm(`Delete ${person.name}`)
    if (res) {
      personService.Delete(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
      setNotify(`${person.name} has been deleted`)
          setTimeout(() => {
          setNotify(null)}, 5000)
          .catch(error => {
            setNotify(error.response.data.error);
            setTimeout(() => {
              setNotify(null)
            }, 5000)
          })
      }
    }
  

  const handleOnUpdate = (updatedPerson) => {
    personService.update(updatedPerson.id, updatedPerson).then(personData => {
      let newListPersons = persons.map(person => person.name === personData.name ? personData : person)
      setPersons(newListPersons)
      setNewNumber('')
      setNewName('')
      setNotify(`${updatedPerson.name} has been updated`)
      setTimeout(() => {
      setNotify(null)}, 5000)
    }).catch((error) => {
      setNotify({
        error: `Information for ${updatedPerson.name} has already been removed from server`,
      });
      setPersons(persons.filter(p => p.id !== updatedPerson.id))
      setTimeout(() => {
        setNotify(null);
      }, 5000)
    })
  }

  return (
    <div>
      <h1>Phone book</h1>
      <Notification message={notify} />
      <Filter filter={newFilter} onChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleOnDelete={deletePerson} />
    </div>
  )
}

export default App