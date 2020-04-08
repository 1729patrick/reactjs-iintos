import axios from 'axios';

export const CALENDAR_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3334/api/calendar'
    : 'https://iintoska2.ips.pt/api/calendar';

const apiCalendar = axios.create({
  baseURL: CALENDAR_URL,
});

export default apiCalendar;
