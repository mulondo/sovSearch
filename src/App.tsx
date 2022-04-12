import React, { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css'
import Films from './pages/Films'
import FilmsContext from './context/FilmsContext'
import axios from 'axios'
import SingleFilm from './pages/SingleFilm'

function App() {
    const [films, setFilms] = useState<string[]>([])
    const [filteredFilms, setFilteredFilms] = useState<string[]>([])
    const [searchedFilms, setSearchedFilms] = useState<[]>([])


  useEffect(() => {
    axios.get('https://swapi.dev/api/films').then(function (response) {
      setFilms(response.data.results)
    })
  }, [])
  return (
      <div className='App'>
          <FilmsContext.Provider value={{ films, filteredFilms, setFilteredFilms, searchedFilms, setSearchedFilms}}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Films />} />
                      <Route path="/film/:episode_id" element={<SingleFilm />} />
                  </Routes>
              </BrowserRouter>
          </FilmsContext.Provider>
      </div>
  )
}

export default App
