import axios from 'axios';

const apiCalendar = () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }

  return axios.create({
    baseURL: 'http://localhost:3334/api/calendar',
    headers: {
      // authorization: `Bearer ${user?.email}`,
      userID: `c@c.com`,
    },
  });
};

export default apiCalendar();
