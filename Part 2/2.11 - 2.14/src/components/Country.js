import React from 'react'
import Weather from './Weather'
const Country = ({country ,weather }) => {
    return (
   <div>
       <h1>{country.name}</h1>
       <p>capital {country.capital}</p>
       <p>population {country.population} </p>
       <h2>languages</h2>
       <ul>
           {country.languages.map(language=>
            <li key = {language.name}> {language.name}</li>)}
       </ul>
       <p>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`} 
        height="60" 
        width="60" 
      />
      </p>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt='weather icon' />
      <p><b>wind: </b> {weather.wind_speed} kph direction {weather.wind_dir}</p>

   </div>
  )
    
}

export default Country