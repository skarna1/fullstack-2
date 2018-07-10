import React from 'react';

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

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name} </td>
            <td>{person.number}</td>
        </tr>
    )
}

const PersonList = ({ persons }) => {
    return (
        <div>
            <h2>Numerot</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <Person key={person.name} person={person} />)}
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
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    isNameInCatalog = (name) => {
        const findPerson = (person) => {
            return person.name === name;
        }

        return (this.state.persons.findIndex(findPerson) !== -1)
    }

    addName = (event) => {
        event.preventDefault()
        if (this.isNameInCatalog(this.state.newName)) {
            return
        }
        const person = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        const persons = this.state.persons.concat(person)
        this.setState({ persons: persons })
    }



    render() {
        const getRenderedPersons = () =>
            this.state.persons.filter(person =>
                person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <FilterField filter={this.state.filter}
                    handleFilterChange={this.handleFilterChange} />
                <NewPersonForm
                    newName={this.state.newName}
                    newNumer={this.state.newNumber}
                    handleNameChange={this.handleNameChange}
                    handleNumberChange={this.handleNumberChange}
                    addName={this.addName} />
                <PersonList persons={getRenderedPersons()} />
            </div>
        )
    }
}

export default App