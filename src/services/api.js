import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  // !process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:3333/api'
  //   : 'https://iintoska2.ips.pt/api',
});

export default api;
