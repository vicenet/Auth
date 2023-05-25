import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import api from '../axiosConfig';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the POST request to the backend to verify OTP and register the user
    api
      .post('/register', {
        phone: phone,
        email: email,
        password: password,
        otp: enteredOTP,
      })
      .then((response) => {
        console.log('Registration successful:', response);
        // Handle successful registration (e.g., display a success message, redirect to a new page)
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        // Handle registration error (e.g., display an error message)
      });
  };

  const handleSendEmail = () => {
    // Make the POST request to the backend to send the email with OTP
    api
      .post('/send_email/', { email: email })
      .then((response) => {
        console.log('Email sent successfully.');
        setEmailSent(true);
        setShowOTPInput(true);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        // Handle email sending error
      });
  };

  const handleOTPVerification = () => {
    // Make the POST request to the backend to verify the entered OTP
    api
      .post('/verify-otp', { email: email, otp: enteredOTP })
      .then((response) => {
        console.log('OTP verified successfully.');
        setVerificationError('');
        setShowOTPInput(false); // Hide the OTP input area
      })
      .catch((error) => {
        console.error('Invalid OTP:', error);
        setVerificationError('Invalid OTP. Please try again.');
      });
  };

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit}>
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
          type="tel"
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginBottom: '10px' }}
        />
        {emailSent && showOTPInput && (
          <>
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
        {emailSent && !showOTPInput && (
          <p style={{ color: 'green', textAlign: 'center' }}>
            OTP has been sent to your email.
          </p>
        )}
        {!emailSent && (
          <Button
            variant="outlined"
            onClick={handleSendEmail}
            fullWidth
            sx={{ marginTop: '10px' }}
          >
            Send OTP
          </Button>
        )}
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
