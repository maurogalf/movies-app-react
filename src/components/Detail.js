import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'

function Detail() {
    const token = localStorage.getItem('token');
    
    let [movieDetail, setMovieDetail] = useState(null);

    
    let movieID = new URLSearchParams(new URL(window.location).hash.split('?')[1]).get("movieID")

    // let movieID = Number(new URLSearchParams(window.location.search).get("movieID"))
    
    useEffect(() => {
        const endpointMovie = `
        https://api.themoviedb.org/3/movie/${movieID}?api_key=44d596ec69904267bc4ec1343caecd86&language=es-ES`
        axios.get(endpointMovie).then(res => {
            setMovieDetail(res.data)
        })
    }, [movieID]);

    const favList = () => JSON.parse(localStorage.getItem('favorites')) || [];
    
    const [fav, setFav] = useState(false);

    const handleFavorite = (id) => {
        const favorites = favList();
        const favIndex = favorites.findIndex(mov => mov.id === id)
        if(favIndex === -1) {
            favorites.push(movieDetail)
            setFav(true)
        } else {
            favorites.splice(favIndex, 1);
            setFav(false)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }


    return (
        <>
            {!token && <Navigate to="/" />}
            {!movieDetail && <p> Cargando... </p>}
            {movieDetail &&
                <>
                    <h2>{movieDetail.title}</h2>
                    <div className='row'>
                        <div className='col-4'>
                            <img className='img-fluid' alt={movieDetail.title} src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`} />
                        </div>
                        <div className='col-8'>
                            <h6>Generos : {movieDetail.genres.map(gen => <span key={gen.id} className="badge bg-secondary m-1">{gen.name}</span>)}</h6>
                            <h5>Reseña: </h5>
                            <p>{movieDetail.overview}</p>
                            <h5>Fecha de lanzamiento : {movieDetail.release_date}</h5>
                            <h6>IMDB : {movieDetail.vote_average}</h6>
                            <button 
                            onClick={()=>handleFavorite(movieID)}
                            className="btn btn-light">
                            { fav 
                            ?
                            "🖤 Quitar de favoritos."
                            :
                            "❤️ Agregar a favoritos."
                            }
                            </button>

                        </div>
                    </div>
                </>
            }
        </>
    )

}

export default Detail;