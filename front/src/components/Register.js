import React, { useState } from 'react';
import api from '../axiosConfig';
import '../App.css';

function SignupView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      });

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
  );
}

export default SignupView;
