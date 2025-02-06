import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role') || ''); 
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      navigate('/adminDash'); // Navigate to Admin Dashboard
    } else if (role === 'user') {
      navigate('/'); // Navigate to User Orders page
      window.location.reload();
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      toast.success('Login successful!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setRole(data.role); // Trigger useEffect to navigate
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row w-3/4">
        <div className="md:w-1/2">
          <img src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" 
          className="h-full w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-700">
              Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up here
                </Link>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
