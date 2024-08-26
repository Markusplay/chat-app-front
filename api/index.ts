import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://chat-app-api-fjps.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
