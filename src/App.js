// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import Navbar from './components/Navbar';
import  Feed  from "./pages/Feed"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function App() {


  return (
    <>
     
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
     <Router>
     <Navbar />
   
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
            <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/feed" 
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          } 
        />


          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
