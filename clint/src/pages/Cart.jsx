import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0); // State to hold total amount

    const navigate=useNavigate()

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/cart/getcart', { headers });
                console.log('Fetched cart data:', response.data.cart); // Log the response

                setCart(response.data.cart);
                calculateTotal(response.data.cart); // Calculate total when fetching cart
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []); // Run once on mount

    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalAmount);
    };

    const handleDelete = async (itemId) => {
        try {
            await axios.post('http://127.0.0.1:3000/cart/', { bookId: itemId }, { headers });
            const updatedCart = cart.filter(item => item._id !== itemId);
            setCart(updatedCart);
            calculateTotal(updatedCart); // Recalculate total after deletion
            console.log('Item deleted:', itemId);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const placeOrder = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/order/add', { cart, total }, { headers });
            console.log('Order placed:', response.data);
            // Optionally clear the cart after placing the order
            setCart([]);
            setTotal(0);
            navigate('/profile/orderHistory')
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.title}</div>
                                            <div className="text-sm opacity-50">{item.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.description}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{item.category}</span>
                                </td>
                                <td>{item.color}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No items in cart</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {cart.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-end">
                    <div className="p-4 bg-zinc-800 rounded">
                        <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
                        <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                            <h2>{cart.length} books</h2> <h2>₹ {total}</h2>
                        </div>
                        <div className="w-[100%] mt-3">
                            <button
                                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300"
                                onClick={placeOrder}
                            >
                                Place your order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
