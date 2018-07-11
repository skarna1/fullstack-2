import React from 'react';
import './index.css'
import personService from './services/persons'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="info">
            {message}
        </div>
    )
}

const FilterField = ({ filter, handleFilterChange }) => {
    return (
        <div>
            rajaa näytettäviä: <input value={filter}
                onChange={handleFilterChange} />
        </div>
    )
}

const NewPersonForm = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.addName}>
                <div>
                    nimi: <input value={props.newName}
                        onChange={props.handleNameChange} />
                </div>
                <div>
                    numero: <input value={props.newNumber}
                        onChange={props.handleNumberChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

const Person = ({ person, deletefunc }) => {
    return (
        <tr>
            <td>{person.name} </td>
            <td>{person.number}</td>
            <td><button onClick={deletefunc}>poista</button></td>
        </tr>
    )
}

const PersonList = ({ persons, deletefunc }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <Person
                            key={person.name}
                            person={person}
                            deletefunc={deletefunc(person.id, person.name)}
                        />)}
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
            ],
            newName: '',
            newNumber: '',
            filter: '',
            infoMessage: null
        }
    }

    handleFieldChange = (field) => (event) => {
        this.setState({ [field]: event.target.value })
    }

    isNameInCatalog = (name) => {
        const findPerson = (person) => {
            return person.name === name;
        }

        return (this.state.persons.findIndex(findPerson) !== -1)
    }

    deletefunc = (id, name) => () => {
        if (window.confirm('Poistetaanko ' + name)) {
            personService
                .remove(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== id),
                        infoMessage: 'poistettiin ' + name
                    })
                    setTimeout(() => {
                        this.setState({ infoMessage: null })
                    }, 5000)
                })
                .catch(error => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== id),
                        infoMessage: 'henkilö ' + name + ' oli jo poistettu'
                    })
                    setTimeout(() => {
                        this.setState({ infoMessage: null })
                    }, 5000)
                    console.log('henkilö ' + name + ' oli jo poistettu')
                })
        }
    }

    addName = (event) => {
        event.preventDefault()

        const add = () => {
            const person = {
                name: this.state.newName,
                number: this.state.newNumber,
                id: this.state.persons.length + 1
            }

            personService
                .create(person)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                        infoMessage: 'lisättiin ' + newPerson.name
                    })

                    setTimeout(() => {
                        this.setState({ infoMessage: null })
                    }, 5000)
                })
        }
        const replace = (name, newNumber) => {
            const oldperson = this.state.persons.find(n => n.name === name)
            const updatedPerson = { ...oldperson, number: newNumber }
            console.log(updatedPerson)
            personService
                .update(updatedPerson.id, updatedPerson)
                .then(person => {
                    this.setState({
                        persons: this.state.persons.map(
                            p => p.id !== updatedPerson.id ? p : person),
                        newName: '',
                        newNumber: '',
                        infoMessage: 'korvattiin henkilön ' +
                            person.name + ' numero numerolla ' + person.number
                    })
                    setTimeout(() => {
                        this.setState({ infoMessage: null })
                    }, 5000)
                })
                .catch(error => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== updatedPerson.id),
                    })
                    add()
                })

        }

        if (this.isNameInCatalog(this.state.newName)) {
            if (window.confirm(this.state.newName +
                ' on jo luettelossa. Korvataanko vanha numero uudella?')) {
                replace(this.state.newName, this.state.newNumber)
            }
            return
        }

        add()
    }

    componentDidMount() {
        personService.getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }

    render() {
        const getRenderedPersons = () =>
            this.state.persons.filter(person =>
                person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.infoMessage} />
                <FilterField filter={this.state.filter}
                    handleFilterChange={this.handleFieldChange('filter')} />
                <NewPersonForm
                    newName={this.state.newName}
                    newNumber={this.state.newNumber}
                    handleNameChange={this.handleFieldChange('newName')}
                    handleNumberChange={this.handleFieldChange('newNumber')}
                    addName={this.addName} />
                <PersonList persons={getRenderedPersons()}
                    deletefunc={this.deletefunc} />
            </div>
        )
    }
}

export default App