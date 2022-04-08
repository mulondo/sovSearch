import React, { useEffect, useState } from 'react'
import './App.css'
import Films from './pages/Films'
import FilmsContext from './context/FilmsContext'
import axios from 'axios'

function App() {
  const [films, setFilms] = useState<string[]>([])
  useEffect(() => {
    axios.get('https://swapi.dev/api/films').then(function (response) {
      // console.log(response.data.results)
      setFilms(response.data.results)
    })
  }, [])
  return (
      <div className='App'>
        <FilmsContext.Provider value={{ films }}>
          <Films />
        </FilmsContext.Provider>
      </div>
  )
}

export default App
