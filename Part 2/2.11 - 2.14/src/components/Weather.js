import React from 'react'

const Weather = ({weather}) => {
    return (
   <div>
      <p><b>temperature: </b> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt='weather icon' />
      <p><b>wind: </b> {weather.wind_speed} kph direction {weather.wind_dir}</p>
   </div>
  )
    
}

export default Weather