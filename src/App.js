import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import GlobalStyle from '~/styles/global';

import Routes from './routes';

function App() {
  return (
    <div>
      <Routes />
      <GlobalStyle />
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
}

export default App;
