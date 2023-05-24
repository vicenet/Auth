import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isOTPExpired, setIsOTPExpired] = useState(true);

  useEffect(() => {
    let timer;
    if (otp) {
      setIsOTPExpired(false);
      timer = setTimeout(() => {
        setIsOTPExpired(true);
      }, 30000); // Set the OTP lifespan to 30 seconds (30000 milliseconds)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [otp]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp && otp === enteredOTP) {
      console.log('OTP verified successfully.');
      // Perform registration logic here
      // Make a POST request to your backend API with the registration data
      const registrationData = {
        phone: phone,
        email: email,
        password: password,
      };
      // Make the POST request with the registration data
      // Example using fetch:
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify(registrationData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Registration successful:', response);
          // Handle successful registration (e.g., display a success message, redirect to a new page)
        })
        .catch((error) => {
          console.error('Registration failed:', error);
          // Handle registration error (e.g., display an error message)
        });
    } else {
      console.log('Invalid OTP.');
      setVerificationError('Invalid OTP. Please try again.');
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
    fetch('/send-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
    if (otp === enteredOTP) {
      console.log('OTP verified successfully.');
      setVerificationError('');
    } else {
      console.log('Invalid OTP.');
      setVerificationError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    const newOtp = generateOTP();
    setOtp(newOtp);
    sendEmail(email, newOtp);
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
            {isOTPExpired && (
              <Button
                variant="outlined"
                onClick={handleResendOTP}
                fullWidth
                sx={{ marginTop: '10px' }}
              >
                Resend OTP
              </Button>
            )}
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
            {!isOTPExpired && (
              <Button
                variant="contained"
                onClick={handleOTPVerification}
                fullWidth
                sx={{ marginTop: '10px' }}
              >
                Verify OTP
              </Button>
            )}
          </>
        )}
        {otp && (
          <>
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
          </>
        )}
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
