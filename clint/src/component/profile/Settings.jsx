import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(''); // Local state for address input
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/user/userinfo', { headers });
                setUserInfo(response.data);
                setAddress(response.data.address || ''); // Set initial address value
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Failed to load user information');
            }
        };

        fetchUserInfo();
    }, []); // Run once on mount

    const updateAddress = async (e) => {
        e.preventDefault();

        try {
            await axios.put('http://127.0.0.1:3000/user/updateUser', { address }, { headers });
            console.log('Address updated successfully');
            setUserInfo((prevState) => ({ ...prevState, address }));
            // No need to clear the input field here if you want to keep the updated address visible
        } catch (error) {
            console.error('Error updating address:', error);
            setError('Failed to update address. Please try again.');
        }
    }

    const handleChange = (e) => {
        setAddress(e.target.value); // Update address state as user types
    }

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-zinc-200 mb-4">User Settings</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {userInfo ? (
                <div className="text-zinc-300">
                    <p className="mb-2"><strong>Name:</strong> {userInfo.username}</p>
                    <p className="mb-2"><strong>Email:</strong> {userInfo.email}</p>
                    <form onSubmit={updateAddress}>
                        <input
                            type="text"
                            name="address"
                            value={address} // Controlled input
                            className="p-2 rounded bg-gray-700 text-zinc-300"
                            placeholder="Update your address"
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="ml-2 p-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                        >
                            Update Address
                        </button>
                    </form>
                    {/* Add more fields as necessary */}
                </div>
            ) : (
                <p className="text-center text-zinc-400">Loading user information...</p>
            )}
        </div>
    );
}

export default Settings;
