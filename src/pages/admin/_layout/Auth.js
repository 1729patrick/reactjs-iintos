import React from 'react';

import { Wrapper } from './styles';
import Header from '~/components/Header';

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <span>{children}</span>
    </Wrapper>
  );
};

export default AuthLayout;
