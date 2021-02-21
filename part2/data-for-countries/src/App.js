import './App.css'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({ weather }) => {
  if (weather === null) {
    return <p>Having trouble recovering weather data.</p>
  } else {
    return (
      <div>
        <h3>Weather in { weather.location.name }</h3>
        <p><b>Temperature: </b>{ weather.current.temperature }ºC</p>
        <img src={ weather.current.weather_icons[0] } alt={ weather.current.weather_descriptions[0] } />
        <p><b>Wind: </b>{ weather.current.wind_speed }kmh, direction { weather.current.wind_dir }</p>
      </div>
    )
  }
}

const CountryData = ({ country, handleShowCountry, weather }) => (
  <div>
    <button onClick={() => { handleShowCountry(null) }}>close</button>
    <h2>{ country.name }</h2>
    <p>
      capital: { country.capital } <br/>
      population: { country.population }
    </p>
    <h3>Languages</h3>
    <ul>
      { country.languages.map(language => <li key={ language.iso639_2 }>{ language.name }</li>) }
    </ul>
    <img src={ country.flag } alt={ `${ country.name }'s flag` } className="flag" />
    <WeatherData weather={ weather } />
  </div>
)

const ListCountry = ({ country, handleShowCountry }) => 
  <>
    <p>{ country.name } <button onClick={ () => { handleShowCountry(country) } }>show</button></p>
  </>

const Countries = ({ countries, showCountry, handleShowCountry, weather }) => {
  if (showCountry != null) {
    return (
      <CountryData country={ showCountry} handleShowCountry={ handleShowCountry } weather={ weather } />
    )
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return (
      <>
        { countries.map(country => <ListCountry key={ country.alpha3Code } country={ country } handleShowCountry={ handleShowCountry } />) }
      </>
    )
  }
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ showCountry, setShowCountry ] = useState(null)
  const [ weather, setWeather ] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if(showCountry != null) {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${ api_key }&query=${ showCountry.capital }`)
        .then(response => {
          if (response.data.success !== undefined && response.data.success === false) {
            setWeather(null)
          } else {
            setWeather(response.data)
          }
        })
    } else {
      setWeather(null)
    }
  }, [showCountry])

  useEffect(() => {
    setFilteredCountries(
      countries
        .filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    )
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = (country) => {
    setShowCountry(country)
  }

  return (
    <div className="App">
      <p>
        find countries <input value={ filter } onChange={ handleFilterChange } />
      </p>
      <Countries countries={ filteredCountries } showCountry={ showCountry } handleShowCountry={ handleShowCountry } weather={ weather } />
    </div>
  )
}

export default App;
