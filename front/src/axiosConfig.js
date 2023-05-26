import axios from 'axios';
// import twilio from 'twilio';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Replace with your Django backend URL
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Assumes the token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Twilio configuration
// const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
// const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
// const twilioClient = twilio(accountSid, authToken);

export default instance;
