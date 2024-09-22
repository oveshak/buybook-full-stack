import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
    // Fetch the existing book data
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/book/${id}`, { headers });
                setBook(response.data); // Set the fetched book data to state
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const title = e.target.title.value;
        const author = e.target.author.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const language = e.target.language.value;
        const image = e.target.image.value;
        const values = { title, author, price, description, language, image };
    
        try {
            const response = await axios.put(
                `http://127.0.0.1:3000/book/update/${id}`, // Update the endpoint accordingly
                values,
                { headers }
            );
            console.log(response.data);
            navigate("/"); // Navigate after successful update
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    // Show loading state while fetching book details
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 h-[100%] bg-gray-800 rounded-lg shadow-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Update Book</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={book.title} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        defaultValue={book.author} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={book.price} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        defaultValue={book.description} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="language" className="block mb-2">Language</label>
                    <input
                        type="text"
                        name="language"
                        defaultValue={book.language} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">Book Cover Image</label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={book.image} // Prefill with current value
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
