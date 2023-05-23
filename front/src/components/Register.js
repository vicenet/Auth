import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import api from '../axiosConfig';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword && otp) {
      const user = {
        password: password,
        email: email,
        phone: phone,
        otp: otp,
      };

      api
        .post('register/', user)
        .then((response) => {
          alert('Registration successful!');
          // Additional logic after successful registration (e.g., redirect to a new page)
        })
        .catch((error) => {
          alert('Registration failed:', error);
          // Additional error handling logic
        });
    } else {
      console.log('Passwords do not match or OTP is missing.');
    }
  };

  const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  };

  const sendEmail = (email, otp) => {
    api
      .post('send-email/', { email: email, otp: otp })
      .then((response) => {
        console.log('Email sent successfully.');
        // Handle successful email sending
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        // Handle email sending error
      });
  };

  const handleOTPVerification = () => {
    // Implement OTP verification logic here
    if (otp === enteredOTP) {
      console.log('OTP verified successfully.');
      setVerificationError('');
    } else {
      console.log('Invalid OTP.');
      setVerificationError('Invalid OTP. Please try again.');
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
          type="number"
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        {otp && (
          <TextField
            label="One-Time Password"
            value={otp}
            disabled
            fullWidth
            margin="normal"
            sx={{ marginBottom: '10px' }}
          />
        )}
        {!otp && (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                const newOtp = generateOTP();
                setOtp(newOtp);
                sendEmail(email, newOtp);
              }}
              fullWidth
              sx={{ marginTop: '10px' }}
            >
              Resend OTP
            </Button>
            <TextField
              type="text"
              label="Enter OTP"
              value={enteredOTP}
              onChange={(e) => setEnteredOTP(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ marginBottom: '10px' }}
            />
            {verificationError && (
              <p style={{ color: 'red' }}>{verificationError}</p>
            )}
            <Button
              variant="contained"
              onClick={handleOTPVerification}
              fullWidth
              sx={{ marginTop: '10px' }}
            >
              Verify OTP
            </Button>
          </>
        )}
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
