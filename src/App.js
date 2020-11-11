import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    name && (async () => {
      try {
        const result = await axios(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        setCountry(result.data[0])
      } catch (error) {
        setCountry('not found')
      }
    })()
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  if (!country) return null
  console.log('Country: ', country)

  if (!country.name) {
    return (
      <div>not found...</div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>Capital: <b>{country.capital}</b></div>
      <div>Population: <b>{country.population}</b></div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    nameInput.value && setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App