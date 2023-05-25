import React, { useState } from 'react';
<<<<<<< HEAD
import { Box, Button, TextField } from '@mui/material';
import api from '../axiosConfig';
=======
import api from '../axiosConfig';
import '../App.css';
>>>>>>> d1d05d9271c89c87d664fb8cbaffb68fd18e05d2

function SignupView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
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
=======
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/signup/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
>>>>>>> d1d05d9271c89c87d664fb8cbaffb68fd18e05d2
      });

<<<<<<< HEAD
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
=======
      if (response.status === 201) {
        setIsOtpSent(true);
        // Handle successful signup
        console.log('Signup successful');
      } else {
        // Handle signup error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/verify-otp/', { email, otp });

      if (response.status === 200) {
        // Handle successful OTP verification
        console.log('OTP verified successfully');
      } else {
        // Handle OTP verification error
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error occurred during OTP verification:', error);
    }
  };

  return (
    <div>
      {!isOtpSent ? (
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
>>>>>>> d1d05d9271c89c87d664fb8cbaffb68fd18e05d2
  );
}

export default SignupView;
