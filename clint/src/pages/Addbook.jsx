import React from 'react';
import axios from 'axios';

const Addbook = () => {
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
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
            const response = await axios.post(
                'http://127.0.0.1:3000/book/add', values,
                { headers }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    
    return (
        <div className="p-6 h-[100%] bg-gray-800 rounded-lg shadow-md text-white">
            <h1 className="text-2xl font-semibold mb-4">Add a New Book</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="language" className="block mb-2">Language</label>
                    <input
                        type="text"
                        name="language"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">Book Cover Image</label>
                    <input
                        type="text"
                        name="image"
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default Addbook;
