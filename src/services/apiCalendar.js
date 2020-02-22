import axios from 'axios';

const apiCalendar = () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }

  return axios.create({
    baseURL: 'http://localhost:3334/api/calendar',
    headers: {
      userID: user?.email,
    },
  });
};

export default apiCalendar();
