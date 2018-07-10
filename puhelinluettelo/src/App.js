import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number: '040-123456'
                }
            ],
            newName: '',
            newNumber: ''
        }
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
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input value={this.state.newName}
                            onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input value={this.state.newNumber}
                            onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                    {this.state.persons.map(person =>
                        <tr key={person.name}>
                            <td>{person.name} </td>
                            <td>{person.number}</td>
                        </tr>)}
                        </tbody>
                </table>

            </div>
        )
    }
}

export default App