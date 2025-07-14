import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;