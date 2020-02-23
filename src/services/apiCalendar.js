import axios from 'axios';

export const CALENDAR_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3334/api/calendar'
    : 'https://portalbox.tech/api/calendar';

const apiCalendar = () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }

  return axios.create({
    baseURL: CALENDAR_URL,
    headers: {
      userID: user?.email,
    },
  });
};

export default apiCalendar;
