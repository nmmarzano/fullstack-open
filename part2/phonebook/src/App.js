import './App.css'

import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ notification }) => {
  if (notification === null || notification.message === null) {
    return null
  }

  return (
    <div className={ notification.type }>
      {notification.message}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => <>filter shown with: <input value={ filter } onChange={ handleFilterChange } /></>

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmitNew }) => (
  <form onSubmit={ handleSubmitNew }>
    <div>
      name: <input value={ newName } onChange={ handleNameChange } />
    </div>
    <div>
      number: <input value={ newNumber } onChange={ handleNumberChange } />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person, handleDelete }) => (
  <li>
    { person.name }: { person.number } <button onClick={ () => { handleDelete(person) } }>delete</button>
  </li>
)

const Persons = ({ persons, filter, handleDelete }) => (
  <ul>
    { persons
      .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      .map(person => <Person key={ person.name } person={ person } handleDelete={ handleDelete } />) }
  </ul>
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const [notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmitNew = event => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      window.alert('One or more fields are empty.')
      return
    }

    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      if (window.confirm(`"${ newName }" is already added to the phonebook, replace the old number with a new one?`)) {
        handleEdit({...oldPerson, number: newNumber})
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(response => {
        setNotification({message: `The person '${ response.name }' was successfully created.`, type: 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.concat(response))
      }).catch(error => {
        setNotification({message: `The person '${ newPerson.name }' could not be created.`, type: 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${ person.name }?`)) {
      personService
      .deleteOne(person.id)
      .then(response => {
        setNotification({message: `The person '${ person.name }' was successfully deleted.`, type: 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      }).catch(error => {
        setNotification({message: `The person '${ person.name }' was not found in the database.`, type: 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handleEdit = person => {
    personService
      .update(person.id, person)
      .then(response => {
        setNotification({message: `The person '${ person.name }' was successfully edited.`, type: 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.map(p => p.id === response.id ? response : p))
      })
      .catch(error => {
        setNotification({message: `The person '${ person.name }' was already deleted or otherwise not found.`, type: 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(p => p.id != person.id))
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={ notification } />
      <Filter filter={ filter } handleFilterChange={ handleFilterChange } />
      <h3>Add a new one</h3>
      <PersonForm 
        newName={ newName } 
        newNumber={ newNumber } 
        handleNameChange={ handleNameChange } 
        handleNumberChange={ handleNumberChange } 
        handleSubmitNew={ handleSubmitNew } />
      <h3>Numbers</h3>
      <Persons persons={ persons } filter={ filter } handleDelete={ handleDelete } />
    </div>
  )
}

export default App