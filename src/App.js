import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UserProvider, persistedUser } from './context/UserContext';

import GlobalStyle from '~/styles/global';

import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';

import Routes from './routes';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(persistedUser());
  }, []);

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${user?.token}`;
    apiCalendar.defaults.headers.userID = user?.user?.email;
  }, [user]);

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
