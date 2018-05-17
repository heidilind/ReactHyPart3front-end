import React from 'react'
import PersonInfo from './components/PersonInfo'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
      this.setState({ filter: event.target.value})
  }

  addDelay = () => {
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  deletePerson = (person) => () => {
      window.confirm(`Poistetaanko ${person.name}?`) &&
      personService
        .destroy(person.id)
        .then(response => {
          this.setState({
            error: `henkilö '${person.name}' poistettiin`,
            persons: this.state.persons.filter(p => p !== person)
          })
          this.addDelay()
        })
  }

  addPerson = (event) => {
    event.preventDefault()
    const isNewPerson = this.state.persons.every(p => p.name !== this.state.newName)
    const person = { name: this.state.newName, number: this.state.newNumber}
    const updatePerson = this.state.persons.find(p => p.name === person.name)

    if (person.name === '' || person.number === '') {
      this.setState({
        error: `täytä molemmat kentät`
      })
      this.addDelay()
    } else if (isNewPerson) {
      personService
        .create(person)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            error: `henkilö '${person.name}' lisättiin`,
            newName: '', newNumber: ''
          })
          this.addDelay()
        })
    } else {
      window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)
      personService
        .update(updatePerson.id, person)
        .then(updatedPerson => {
          this.setState({
            persons: this.state.persons.filter(p => p !== updatePerson).concat(updatedPerson),
            error: `henkilön '${person.name}' tiedot päivitetty`,
            newName: '', newNumber: ''
          })
          this.addDelay()
        })
        .catch(error => {
          console.log('fail')
        })
    }
  }

  parseFilterWord = (word) => word.toUpperCase().includes(this.state.filter.toUpperCase().trim())

  componentWillMount() {
      personService
        .getAll()
        .then(persons => {
          this.setState({persons})
        })
  }

  render() {
    const personsToShow =
      this.state.filter === '' ?
      this.state.persons :
      this.state.persons.filter(p => this.parseFilterWord(p.name))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.error} />
        <div>
          rajaa näytettäviä:
          <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <h2>Lisää uusi</h2>
        <PersonForm
          add={this.addPerson}
          name={this.state.newName} nameChange={this.handleNameChange}
          number={this.state.newNumber} numberChange={this.handleNumberChange}
          />

        <h2>Numerot</h2>
        <PersonInfo persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App
