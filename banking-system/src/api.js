// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-esb-url.com', // replace with your ESB's URL
});

export default api;
