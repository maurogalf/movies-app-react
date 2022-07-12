import { useEffect } from 'react';
import { useState } from 'react';

const FavButton = ({idMovie, handleFavorite, favorite}) => {
    const [fav, setFav] = useState(false);

    const handleFav = () => {
        setFav(!fav);
        handleFavorite(idMovie);
    }

    useEffect(() => {
        const favList = JSON.parse(localStorage.getItem('favorites')) || [];
        favList.map(movie => movie.id === idMovie && setFav(true));
    }
    , [idMovie]);

    return (
        <button 
        className='btn-favorite'
        id={idMovie}
        onClick={()=> handleFav()}>
            {fav ? '❤️' : '🖤'}
        </button>

    )
}

export default FavButton;