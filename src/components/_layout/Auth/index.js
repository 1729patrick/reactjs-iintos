import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';
import Footer from '../Footer';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Header />
        <div>{children}</div>
        <Footer links />
      </Wrapper>
    </>
  );
};

export default AuthLayout;
