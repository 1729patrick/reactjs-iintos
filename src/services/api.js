import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333'
      : 'https://portalbox.tech',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
