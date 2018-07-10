import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
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
        const person = { name: this.state.newName }
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
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {this.state.persons.map(person =>
                        <li key={person.name}>
                            {person.name} </li>)}
                </ul>

            </div>
        )
    }
}

export default App