import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite, onFavoriteRemoved }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const removeFavorites = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:3000/favourite/{data._id}`, { bookId: data._id }, { headers });
            console.log('Favorite removed:', response.data);
            // Trigger state update to refresh the UI
            if (onFavoriteRemoved) {
                onFavoriteRemoved(data._id);
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div className="flex flex-col">
            <Link to={`/book/${data._id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 flex items-center justify-center">
                        <img src={data.image} alt={data.title} className="h-[25vh] object-cover" />
                    </div>
                    <h2 className="mt-4 text-xl text-zinc-100 font-semibold">{data.title}</h2>
                    <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
                    <p className="mt-2 text-zinc-400 font-semibold text-xl">{data.price}</p>
                </div>
            </Link>
            {favourite && (
                <button 
                    onClick={removeFavorites} 
                    className="mt-2 bg-yellow-500 text-black font-bold text-xl px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                >
                    Remove from Favorites
                </button>
            )}
        </div>
    );
};

export default BookCard;