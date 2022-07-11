import { Link, Navigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios';
import swAlert from '@sweetalert/with-react';



function Listado() {
    const token = localStorage.getItem('token');
    const [ movieList, setMovieList] = useState([]);

    useEffect(()=> {
        const endPint = 'https://api.themoviedb.org/3/discover/movie?api_key=44d596ec69904267bc4ec1343caecd86&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPint)
        .then(res => {
            const apiData = res.data.results
            setMovieList(apiData)
        })
        .catch(err =>{
            console.log(err)
            swAlert(<h2>Hubo errores</h2>)
    })
    }, [setMovieList]);
    console.log(movieList)

    return (
        <>
        { !token && <Navigate to="/"/>}
        <div className='row container'>
            { movieList.map((oneMovie, index)=>{
                return (
            <div className='col-3 my-3' key={index}>
                <div className="card">
                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{oneMovie.title}</h5>
                            <p className="card-text">{oneMovie.overview.substring(0,100)}</p>
                            <Link to={`/detail?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
                        </div>
                </div>
            </div>

                )

            })}
        </div>
        </>
    )
}
export default Listado