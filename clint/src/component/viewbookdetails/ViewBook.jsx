import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selector = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    console.log(role, selector);

    const [data, setData] = useState(null); // Initialize as null
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,  // Ensure token is correctly set
      };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/book/${id}`);
                setData(response.data);
                console.log(`Fetched data: `, response.data); // Log response.data
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleAdd = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:3000/favourite/add/",
                { bookId: id },
                { headers }
            );
            console.log(`Added book to favorites: ${response.data}`);
        } catch (error) {
            console.error('Error adding book to favorites:', error);
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:3000/cart/add/",
                { bookId: id },
                { headers }
            );
            console.log(`Added book to cart: ${response.data}`);
        } catch (err) {
            console.error('Error adding book to cart:', err);
        }
    };

    const handleDelete = async () => {
        try {
            // Send DELETE request with the book ID in the URL
            const response = await axios.delete(`http://127.0.0.1:3000/book/${id}`, { headers });
            console.log(`Deleted book: ${response.data}`);

            // Navigate to home after successful deletion
            navigate("/");
        } catch (err) {
            console.error('Error deleting book from database:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <>
            {data ? (
                <div className='px-12 py-8 bg-zinc-900 flex gap-8'>
                    <div className='bg-zinc-800 rounded p-4 h-[88vh] flex justify-around w-3/6 gap-8'>
                        <img src={data.image} alt={data.title} className='h-[70vh]' />
                        {selector === true && role === "user" && (
                            <div className='flex flex-col gap-4'>
                                <button className='bg-white rounded-full p-2 text-2xl' onClick={handleAdd}>
                                    <FaHeart />
                                </button>
                                <button className='bg-white rounded-full p-2 text-2xl' onClick={handleCart}>
                                    <FaShoppingCart />
                                </button>
                            </div>
                        )}
                        {selector === true && role === "admin" && (
                            <div className='flex flex-col gap-4'>
                                <Link to={`/update/${id}`} className='bg-white rounded-full p-2 text-2xl' >
                                    <FaRegEdit />
                                </Link>
                                <button className='bg-white rounded-full p-2 text-2xl' onClick={handleDelete}>
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='p-4 w-3/6'>
                        <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
                        <p className='text-zinc-400 text-lg mt-2'>by {data.author}</p>
                        <p className='text-zinc-400 text-lg'>{data.language}</p>
                        <p className='text-zinc-400 mt-4 text-lg'>{data.description}</p>
                        <p className='text-zinc-300 text-2xl font-bold mt-4'>${data.price}</p>
                    </div>
                </div>
            ) : (
                <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            )}
        </>
    );
}

export default ViewBook;
