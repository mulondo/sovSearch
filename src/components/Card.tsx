import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'

function Card({ film }: any) {
    const Section= styled.div`
      display: block;
      margin: 10px;
      border: 1px solid black;
      padding:2rem;
      height: 100px;
      width: 300px;
      text-align: center;
      cursor: pointer;
      &:hover{
        width: 310px;
        transition: 0.3s;
    }
`
    return (
        <div>
            <Link to={`/film/${film.episode_id}`}>
                <Section>{film.title}</Section>
            </Link>

        </div>
    )
}

export default Card
