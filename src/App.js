import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserProvider, persistedUser } from './context/UserContext';

import GlobalStyle from '~/styles/global';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';

import Routes from './routes';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedUser = persistedUser();

    api.defaults.headers.authorization = `Bearer ${loggedUser?.token}`;
    apiCalendar.defaults.headers.userID = loggedUser?.user?.email;

    setUser(loggedUser);
  }, []);

  if (!user) {
    return <div />;
  }

  return (
    <UserProvider value={{ ...user, setUser }}>
      <Routes />
      <GlobalStyle />
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </UserProvider>
  );
}

export default App;
