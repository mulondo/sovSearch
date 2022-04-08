import React, { useContext } from 'react'
import styled from 'styled-components'
import FilmsContext from '../context/FilmsContext'

function Card({ film }: any) {
    const Section= styled.div`
      margin: 10px;
      border: 1px solid black;
      padding:2rem;
      height: 100px;
      width: 300px;
      text-align: center;
      cursor: pointer`

    return (
        <div>
            <Section>{ film.title }</Section>
        </div>
    )
}

export default Card
