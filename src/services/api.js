import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://iintoska2.ips.pt/api'
      : 'https://iintoska2.ips.pt/api',
});

export default api;
