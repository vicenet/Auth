import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import api from '../axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the login credentials
    const credentials = {
      email:email,
      password: password,
    };

    api
      .post('token/', credentials) // Replace 'login/' with the appropriate login endpoint in your Django backend
      .then((response) => {
        const token = response.data.token;
        // Store the token in localStorage or in a state management solution of your choice
        localStorage.setItem('token', token);
        // Perform any necessary actions after successful login (e.g., redirect to a new page)
        // Replace the following line with your desired logic
        console.log('Login successful!');
      })
      .catch((error) => {
        // Handle login error
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        {error && (
          <Box
            sx={{
              marginBottom: '10px',
              color: 'red',
              textAlign: 'center',
            }}
          >
            {error}
          </Box>
        )}
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
