import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterBar from './components/FilterBar'
import Countries from './components/Countries'
import Weather from './components/Weather'
const App = () => {
    const [countries, setCountries] = useState([])
    const [Filter, SetFilter] = useState(''); 
    const [capital,setCapital] = useState('Hanoi')
    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        console.log('effect')
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(res => setCountries(res.data))
    }, [])

    useEffect(() => {
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then(res =>setWeather(res.data.current))
        }, [api_key,capital])

    const handleFilterChange = (event) =>{
        SetFilter(event.target.value);
      }

    const filteredCountries  = Filter === ''
    ? countries
    : countries.filter(country =>
        country.name.toLowerCase().includes(Filter.toLowerCase()))


    return (
        <div>
         <FilterBar text='find countries' value={Filter} onChange={handleFilterChange} />
         <Countries countries = {filteredCountries} setCountries ={setCountries} setCapital = {setCapital} weather = {weather} />
        </div>
    )

}



export default App