import { Link, Navigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import FavButton from './FavButton';



function Listado({favoritos}) {
    const token = localStorage.getItem('token');
    const [ movieList, setMovieList ] = useState([]);

    const getFav = () => JSON.parse(localStorage.getItem('favorites')) || [];
    
    const [ favList , setFavList ] = useState(getFav());

    const handleFavorite = (id) => {
        const favorites = getFav();
        const favIndex = favorites.findIndex(mov => mov.id === id)
        if(favIndex === -1) {
            movieList.map((movie) => movie.id === id && favorites.push(movie))
        } else {
            favorites.splice(favIndex, 1);
        }
        setFavList(favorites)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }


    useEffect(()=> {
        const endPint = 'https://api.themoviedb.org/3/discover/movie?api_key=44d596ec69904267bc4ec1343caecd86&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPint)
        .then(res => {
            const apiData = res.data.results
            if(favoritos){
                setMovieList(favList)
            }else {
                setMovieList(apiData)
            }
        })
        .catch(err =>{
            console.log(err)
            swAlert(<h2>Hubo errores</h2>)
    })
    }, [setMovieList, favoritos, favList]);

    return (
        <>
        { !token && <Navigate to="/"/>}
        <div className='row container'>
            { favoritos? <h2>Películas favoritas</h2>: <h2>Listado de películas</h2>}
            { movieList.length > 0 
            ? 
            movieList.map((oneMovie, index)=>{
                return (
                    <div className='col-3 my-3' key={index}>
                        <div className="card">
                            <FavButton idMovie={oneMovie.id} handleFavorite={handleFavorite} favorites={favoritos} />
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{oneMovie.title}</h5>
                                    <p className="card-text text-truncate">{oneMovie.overview.substring(0,100)}</p>
                                    <Link to={`/detail?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
                                </div>
                        </div>
                    </div>
                    )   
                })
            :
            <h3>No se encontraron películas</h3>
            }
        </div>
        </>
    )
}
export default Listado