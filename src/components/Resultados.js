import {useEffect, useState} from 'react'
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Link, useLocation } from 'react-router-dom';
import FavButton from './FavButton';

function Resultados() {
    const {search} = useLocation()
    const queryWord = new URLSearchParams(search)
    const keyword = queryWord.get('keyword')
    console.log(keyword)

    const [moviesResult, setMovieResult] = useState([]);
    
    useEffect(()=> {
        console.log(keyword)
        const endpointKeyword = `https://api.themoviedb.org/3/search/movie?api_key=44d596ec69904267bc4ec1343caecd86&language=es-ES&page=1&include_adult=true&query=${keyword}`
        
        axios.get(endpointKeyword)
        .then(res => {
            const apiData = res.data.results
            setMovieResult(apiData)
            if (apiData.length === 0){
                swAlert(<h4>Tu busqueda no arrojo resultados</h4>)
            }
        })
        .catch(err =>{
            console.log(err)
            swAlert(<h2>Hubo errores</h2>)
    })}, [keyword]);


    return (
        <div className='row container'>
            <h2>Resultados para : "{keyword}"</h2>
            {/* {moviesResult.length === 0 && <h5> No se encontraron resultados</h5>} */}
            { moviesResult.map((oneMovie, index)=>{
                return (
            <div className='col-4 my-3' key={index}>
                <div className="card">
                    <FavButton idMovie={oneMovie.id}/>
                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{oneMovie.title}</h5>
                            <Link to={`/detail?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
                        </div>
                </div>
            </div>

                )

            })}
        </div>
    )
}

export default Resultados