import React, { useContext } from 'react'
import FilmsContext from '../context/FilmsContext'
import styled from 'styled-components'
import Card from '../components/Card'

function Films() {
  const { films } = useContext(FilmsContext) as any
  const Button = styled.button`
    /* Adapt the colors based on primary prop */
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

  // const Card = styled.div`
  //   margin: 10px;
  //   border: 1px solid black;
  //   padding:2rem;
  //   height: 100px;
  //   width: 300px;
  //   text-align: center;
  //   cursor: pointer

  // `
  return (
    <div>
      <div className='search-section'>
        <input type='text' placeholder='Search' />
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
