import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '~/styles/global';

import Routes from './routes';

function App() {
  return (
    <div>
      <Routes />
      <GlobalStyle />
      <ToastContainer />
    </div>
  );
}

export default App;
