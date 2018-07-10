import React from 'react';
import personService from './services/persons'

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
            filter: ''
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
                        persons: this.state.persons.filter(n => n.id !== id)
                    })
                })
        }
    }

    addName = (event) => {
        event.preventDefault()

        const replace = (name, newNumber) => {
            const person = this.state.persons.find(n => n.name === name)
            const updatedperson = { ...person, number: newNumber }
            console.log(updatedperson)
            personService
                .update(updatedperson.id, updatedperson)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.map(
                            p => p.id !== person.id ? p : response.data),
                        newName: '',
                        newNumber: ''
                    })
                })
        }

        if (this.isNameInCatalog(this.state.newName)) {
            if (window.confirm(this.state.newName +
                ' on jo luettelossa. Korvataanko vanha numero uudella?')) {
                replace(this.state.newName, this.state.newNumber)
            }
            return
        }

        const person = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }

        personService
            .create(person)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newName: '',
                    newNumber: ''
                })
            })

    }

    componentDidMount() {
        personService.getAll()
            .then(response => {
                this.setState({ persons: response.data })
            })
    }


    render() {
        const getRenderedPersons = () =>
            this.state.persons.filter(person =>
                person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
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