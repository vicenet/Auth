import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import api from '../axiosConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      // Create a user object with the registration data
      const user = {
        password: password,
        email: email,
        // Add other registration data if needed
      };

      api
        .post('register/', user) // Replace 'register/' with the appropriate registration endpoint in your Django backend
        .then((response) => {
          // Handle successful registration
          alert('Registration successful!');
          // Additional logic after successful registration (e.g., redirect to a new page)
        })
        .catch((error) => {
          // Handle registration error
          alert('Registration failed:', error);
          // Additional error handling logic
        });
    } else {
      console.log('Passwords do not match.');
    }
  };

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
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
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
