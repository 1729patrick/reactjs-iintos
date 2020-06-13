import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://iintoska2.ips.pt',
      : 'https://iintoska2.ips.pt',
});

export default api;
