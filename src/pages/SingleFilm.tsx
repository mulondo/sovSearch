import React, {useContext} from 'react'
import { useParams } from 'react-router-dom';
import FilmsContext from "../context/FilmsContext";

export default function SingleFilm() {
    const { films} = useContext(FilmsContext) as any
    const params = useParams();
    const selectedParams = params.episode_id? parseInt(params.episode_id): 0
    const selectedFilm = films.filter((film:any) => film.episode_id ===  selectedParams)
    const [film] = selectedFilm
    const viewedFilms: any = []
    if(localStorage.getItem("searchedFilms") === null){
        viewedFilms.push(film)
        localStorage.setItem("searchedFilms", JSON.stringify(viewedFilms))
    } else{
        const storedHistory = JSON.parse(localStorage.getItem("searchedFilms") || '[]')
        storedHistory.push(film)
        localStorage.setItem("searchedFilms", JSON.stringify(storedHistory))
    }
     return (
      <div>
       My card
         <p>{film.title}</p>
      </div>
     )
}
