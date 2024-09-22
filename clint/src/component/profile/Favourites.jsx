import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../bookcard/BookCard';

const Favourites = () => {
    // Initialize favourites as an empty array to avoid undefined errors
    const [favourites, setFavourites] = useState([]);

    const handleFavoriteRemoved = (removedBookId) => {
        setFavourites(prevFavorites => prevFavorites.filter(book => book._id !== removedBookId));
    };

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                // API request to fetch favourite books
                const response = await axios.get('http://127.0.0.1:3000/favourite/', { headers });
                setFavourites(response.data);
            } catch (error) {
                console.error('Error fetching favourites:', error);
            }
        };

        fetchFavourites();
    }, [favourites]); // Run once when the component mounts

    return (
        <div className='grid grid-cols-4 gap-4'>
           {
            favourites.length ===0&& <div>no </div>
           }
            {
                favourites && favourites.map((item,i)=><div key={i}><BookCard data={item} favourite={true} onFavoriteRemoved={handleFavoriteRemoved}/></div>)
            }
        </div>
    );
};

export default Favourites;
