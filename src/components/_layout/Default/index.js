import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
      <Footer />
    </Wrapper>
  );
};

export default DefaultLayout;
