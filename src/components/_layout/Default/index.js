import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';
import Footer from '../Footer';

const DefaultLayout = ({ children, hiddenFooter }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;
