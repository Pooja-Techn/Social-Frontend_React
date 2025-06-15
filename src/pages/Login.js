import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      toast.success(res.data.message);

      // Optional: Store token in localStorage
      localStorage.setItem('token', res.data.token);
      navigate('/home');

      setFormData({ email: '', password: '' });
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
