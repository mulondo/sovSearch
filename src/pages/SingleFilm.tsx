import React, {useContext, useEffect} from 'react'
import Button from '@mui/material/Button';
import {Link, useParams} from 'react-router-dom';
import FilmsContext from "../context/FilmsContext";

export default function SingleFilm() {
    const { films} = useContext(FilmsContext) as any
    const params = useParams();
    const selectedParams = params.episode_id? parseInt(params.episode_id): 0
    const selectedFilm = films.filter((film:any) => film.episode_id ===  selectedParams)
    const [film] = selectedFilm
    const viewedFilms: any = []
    viewedFilms.push(film)

    useEffect(() => {
        if(localStorage.getItem("searchedFilms") !== null) {
            const storedHistory = JSON.parse(localStorage.getItem("searchedFilms") || '[]')
            storedHistory.push(film)
            localStorage.setItem("searchedFilms", JSON.stringify(storedHistory))
        }

        else {
            localStorage.setItem("searchedFilms", JSON.stringify(viewedFilms))
        }
    }, [])

    return (
        <div className={"mt-5"}>
            <Link to={"/"}><Button>Return</Button></Link>
            <h2 className={"text-lg mt-2 mb-b"}>{film.title}</h2>
            <p>{film.opening_crawl}</p>
            <p>Directed by: {film.director}</p>
            <p>Produced by: {film.producer}</p>
            <p>Released on: {film.release_date}</p>
        </div>
    )
}
