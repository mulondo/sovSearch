import React, { useContext, useRef, useState } from 'react'
import FilmsContext from '../context/FilmsContext'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from "axios";

function Films() {
  const { films} = useContext(FilmsContext) as any
  const [filteredFilms, setFilteredFilms] = useState<string[]>([])
  const [isFilmFound, setIsFilmFound] = useState<boolean>(true)
  const searchInput = useRef<HTMLInputElement>(null)

  function debounce(cb:any, delay = 1000) {
    let timeout:any
    return (...args:any) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }

  const handleOnchange = debounce(()=>{
      let searchText = searchInput.current?.value
      axios.get(`https://swapi.dev/api/films/?search=${searchText}`).then(function (response) {
        const isFilm: boolean = searchText && response.data.results.length === 0? false: true
        setIsFilmFound(isFilm)
        setFilteredFilms(response.data.results)
      })
  })

  let currentFilms: [] = filteredFilms.length === 0? films: filteredFilms

  const Button = styled.button`
    background: ${(props: any) => (props.primary ? 'palevioletred' : 'white')};
    color: ${(props: any) => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `

  const Films = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
    flex-wrap: wrap;
  `

  return (
    <div>
      <div className='search-section'>
        <input type='text' ref={searchInput} placeholder='Search' onChange={handleOnchange}/>
        <Button>Search</Button>
        <Button>History</Button>
        <div>
          {isFilmFound? '': 'The Film is not Found'}
        </div>
        <Films>
          {currentFilms.map((film: any, i: number) => <Card key={film.episode_id} film={film} />)}
        </Films>
      </div>
    </div>
  )
}

export default Films
