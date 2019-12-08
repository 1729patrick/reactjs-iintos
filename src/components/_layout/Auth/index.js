import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
    </Wrapper>
  );
};

export default AuthLayout;
