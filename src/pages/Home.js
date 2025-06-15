import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/home', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessage(res.data.message);
      } catch (error) {
        setMessage('Access denied');
      }
    };

    fetchProtected();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;
