import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import LoginPage from '../src/components/Login';
import Signup from '../src/components/Register';

createRoot(document.getElementById('root')).render(
  <Router>
    <Signup></Signup>
    <br></br>
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  </Router>
);
