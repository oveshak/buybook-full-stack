import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();  // useNavigate should be outside handleLogin
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const values = { username, email, password, address };

    try {
      // API call to register user
      const response = await axios.post('http://127.0.0.1:3000/user/register', values);
      console.log(response.data);

      // Redirect to login after successful registration
      navigate('/login');
      //data reset user
      e.target.reset()
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold"> Sign Up</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="Username" className="input input-bordered" name='name' required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className="input input-bordered" name='email' required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className="input input-bordered" name='password' required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input type="text" placeholder="Address" className="input input-bordered" name='address' required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <p className="text-center mt-4">
              Already have an account? <Link to="/login" className="text-red-400">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
