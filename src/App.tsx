import React, { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import './App.css'
import Films from './pages/Films'
import FilmsContext from './context/FilmsContext'
import axios from 'axios'
import SingleFilm from './pages/SingleFilm'

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
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Films />} />
                      <Route path="single-page" element={<SingleFilm />} />
                  </Routes>
              </BrowserRouter>
          </FilmsContext.Provider>


      </div>
  )
}

export default App
