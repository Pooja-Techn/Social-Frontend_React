import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import axiosInstance from '../api/axiosInstance';

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null); // null = loading
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axiosInstance.get('/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  // Still checking
  if (isValid === null) {
    return <div>Loading...</div>;
  }

  // Not valid → redirect
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // Valid → render component
  return children;
}

export default ProtectedRoute;
