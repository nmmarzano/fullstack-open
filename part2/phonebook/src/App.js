import React, { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => <>filter shown with: <input value={ filter } onChange={ handleFilterChange } /></>

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmitNew }) => (
  <>
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
  </>
)

const Person = ({ person }) => <li>{ person.name }: { person.number }</li>

const Persons = ({ persons, filter }) => (
  <ul>
    { persons
      .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      .map(person => <Person key={ person.name } person={ person } />) }
  </ul>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleSubmitNew = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      window.alert('One or more fields are empty.')
      return
    }

    if (persons.find(person => person.name === newName)) {
      window.alert(`"${ newName }" is already added to the phonebook.`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
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
      <Filter filter={ filter } handleFilterChange={ handleFilterChange } />
      <h3>Add a new one</h3>
      <PersonForm 
        newName={ newName } 
        newNumber={ newNumber } 
        handleNameChange={ handleNameChange } 
        handleNumberChange={ handleNumberChange } 
        handleSubmitNew={ handleSubmitNew } />
      <h3>Numbers</h3>
      <Persons persons={ persons } filter={ filter } />
    </div>
  )
}

export default App