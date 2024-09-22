import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrder = () => {
    const [orders, setOrders] = useState([]); // Initialize as an empty array

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/order/', { headers });
                console.log('Fetched order data:', response.data); // Log the response

                setOrders(response.data); // Ensure this matches your API response structure
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); // Run once on mount

    return (
        <div className='flex flex-col space-y-4'>
    {orders.length > 0 ? (
        orders.map((item, index) => (
            <div key={index} className="flex p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-zinc-200">Order #{index + 1}</h2>
                    <p className="text-lg text-zinc-300">Book Title: <span className="font-bold">{item.title}</span></p>
                    <p className="text-lg text-zinc-300">Quantity: <span className="font-bold">{item.quantity}</span></p>
                    <p className="text-lg text-zinc-300">Price: <span className="font-bold">₹{item.price}</span></p>
                    <p className="text-lg text-zinc-300">Status: <span className="font-bold">{item.
orderStatus}</span></p>
                </div>
            </div>
        ))
    ) : (
        <p className="text-center text-lg text-zinc-400">No orders found.</p> // Display a message when no orders exist
    )}
</div>

    );
};

export default UserOrder;
