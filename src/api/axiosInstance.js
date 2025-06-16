// src/api/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://social-media-backend-yzzw.onrender.com' || 'http://localhost:5000', // fallback for local dev
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
