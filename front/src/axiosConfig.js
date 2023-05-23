import axios from 'axios';

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

export default instance;
