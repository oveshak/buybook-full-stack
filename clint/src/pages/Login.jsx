import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authActions } from '../store/auth';
const Login = () => {
  const [error, setError] = useState(null); // State to store any error messages
  const navigate = useNavigate();
const dispatch=useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault();


    
const username = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const values = { username, email, password };

    try {
      // API call to login user
      const response = await axios.post('http://127.0.0.1:3000/user/login', values);
      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))
      // Storing user data in localStorage
      localStorage.setItem('id', response.data.user._id);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      // Redirect to profile page after successful login
      navigate('/profile');
      e.target.reset() // Reset form after successful login
      
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" name='name' className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" name='email' className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name='password' className="input input-bordered" required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message */}

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>

            <p className="text-center mt-4">
              <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
