import React, { useContext, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import FilmsContext from '../context/FilmsContext'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from "axios";

function Films() {
  const { films} = useContext(FilmsContext) as any
  const [filteredFilms, setFilteredFilms] = useState<string[]>([])
  const [isFilmFound, setIsFilmFound] = useState<boolean>(true)
  const [searchText, setSearchText] = useState<string>("")

  const handleOnchange = (e:any) => {
    setSearchText(e.target.value)

    axios.get(`https://swapi.dev/api/films/?search=${searchText}`).then(function (response) {
      const isFilm: boolean = searchText && response.data.results.length === 0? false: true
      setIsFilmFound(isFilm)
      setFilteredFilms(response.data.results)
    })
  }

  const storedHistory: [] = JSON.parse(localStorage.getItem("searchedFilms") || '[]')

  let currentFilms: [] = filteredFilms.length === 0? films: filteredFilms
  const History = styled.p`
    color: purple;
    text-decoration: underline;
    &:hover{
      color: brown;
    }
  `
  const Films = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
    flex-wrap: wrap;
  `
  const PreviouslySearched = styled.div `
    display: grid;
    grid-template-columns: auto auto auto;
    overflow: auto;
  `


  return (
    <div>
      <div className='search-section'>
        <h1 className={"text-cyan-900 text-7xl mt-5"}>Sov Films</h1>
        <input
            className={"mt-56 mb-10 border-2 rounded-full outline-none w-6/12 h-12 text-lg px-4"}
            type='text'
            placeholder='Search for films'
            onChange={handleOnchange}
            value={searchText}
            autoFocus={true}
        />

        <div className={"mt-2 mb-2 text-rose-500"}>
          {isFilmFound? '': 'The Film is not Found'}
        </div>
        <Films>
          {currentFilms.map((film: any, i: number) => <Card key={film.episode_id} film={film} />)}
        </Films>
      </div>

      <h4 className={"mt-2 mb-2 text-lg font-black"}>Previously searched Films</h4>
      <PreviouslySearched>
        {
          storedHistory.map((film:object) => {
            // @ts-ignore
            return(<Link to={`/film/${film.episode_id}`}><History >{film.title}</History></Link>)
          })
        }
      </PreviouslySearched>
    </div>
  )
}
export default Films
