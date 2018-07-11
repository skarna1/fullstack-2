import React from 'react';
import countryService from './services/countries'
import './index.css'


const FilterField = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries: <input value={filter}
        onChange={handleFilterChange} />
    </div>
  )
}

const CountryFullName = ({ country }) => {
  return (
    <tr>
      <td> <h2>{country.name}</h2></td>
      <td> <h2>{country.nativeName}</h2></td>
    </tr>
  )
}

const CountryName = ({ country, clickhandler }) => {
  return (
    <tr>
      <td> <div className="clickable"
        onClick={clickhandler} >{country.name}</div></td>
    </tr>
  )
}

const CountryCapital = ({ country }) => {
  return (
    <tr>
      <td>capital:</td>
      <td>{country.capital} </td>
    </tr>
  )
}

const CountryPopulation = ({ country }) => {
  return (
    <tr>
      <td>population:</td>
      <td>{country.population} </td>
    </tr>
  )
}

const CountryFlag = ({ country }) =>
  <img src={country.flag} alt="flag" />


const DetailedCountry = ({ country }) => {
  return (
    <div>
      <table>
        <tbody>
          <CountryFullName country={country} />
          <CountryCapital country={country} />
          <CountryPopulation country={country} />
        </tbody>
      </table>
      <CountryFlag country={country} />
    </div>
  )
}

const CountryTable = ({ countries, selectCountry }) => {
  return (
    <div>
      <table>
        <tbody>
          {countries.map(country =>
            <CountryName
              key={country.name}
              country={country}
              clickhandler={selectCountry(country.name)}
            />)}
        </tbody>
      </table>
    </div>
  )
}

const CountryDisplay = ({ countries, selectCountry }) => {
  if (countries.length >= 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length === 1) {
    return (
      <DetailedCountry country={countries[0]} />
    )
  }
  return (
    <CountryTable countries={countries}
      selectCountry={selectCountry} />
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [
      ],
      filter: '',
      exactFilter: ''
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
      exactFilter: ''
    })
  }

  selectCountry = (name) => () => {
    this.setState({
      filter: name,
      exactFilter: name
    })
  }

  componentDidMount() {
    countryService.getAll()
      .then(countries => {
        this.setState({ countries })
      })
  }

  render() {
    const getRenderedCountries = () => {
      if (this.state.exactFilter !== '') {
        return this.state.countries.filter(country =>
          (country.name === this.state.exactFilter))
      }

      return (
        this.state.countries.filter(country =>
          (this.state.filter !== '' &&
            country.name.toLowerCase().includes(this.state.filter.toLowerCase())))
      )
    }

    return (
      <div>
        <h2>Countries</h2>

        <FilterField filter={this.state.filter}
          handleFilterChange={this.handleFilterChange} />

        <CountryDisplay countries={getRenderedCountries()}
          selectCountry={this.selectCountry} />
      </div >
    )
  }
}

export default App;
