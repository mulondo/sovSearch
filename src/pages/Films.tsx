import React, { useContext, useRef, RefObject } from 'react'
import FilmsContext from '../context/FilmsContext'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from "axios";

function Films() {
  const { films, filteredFilms, setFilteredFilms } = useContext(FilmsContext) as any
  const searchInput = useRef<HTMLInputElement>(null)
  const handleOnchange = () => {
    let searchText = searchInput.current?.value
    axios.get(`https://swapi.dev/api/films/?search=${searchText}`).then(function (response) {
      setFilteredFilms(response.data.results)
    })
    console.log(filteredFilms)
  }
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
        <Films>
          {films.map((film: any, i: number) => <Card key={film.episode_id} film={film} />)}
        </Films>
      </div>
    </div>
  )
}

export default Films
