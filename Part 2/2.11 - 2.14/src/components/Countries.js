import React from 'react'
import Country from './Country'

const Countries = ({countries, setCountries,setCapital, weather}) => {
  let number = countries.length
    if (number> 10) {
        return (
            <div>
              Too many matches, specify another filter
            </div>
          )
        }
    else if ( number === 1){
      setCapital(countries[0].capital)
      return (<div>
        <Country country={countries[0]} weather  = {weather }/>
      </div>)
    }   
    else{
    return (
    <div>
      {countries.map(country => 
      <li style={{ listStyleType: "none" }}>
        {country.name}
        <button type='button' value={country.name} onClick={()=>setCountries([country])}>show</button>
        </li>)}
    </div>
  )
    }
}

export default Countries