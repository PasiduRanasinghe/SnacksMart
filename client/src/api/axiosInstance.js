import axios from 'axios';
axios.interceptors.request.use((config) => {
  console.log('Request Config:', config);
  return config;
});

axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
