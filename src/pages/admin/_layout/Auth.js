import React from 'react';

import { Wrapper } from './styles';
import Header from '~/components/Header';

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
    </Wrapper>
  );
};

export default AuthLayout;
