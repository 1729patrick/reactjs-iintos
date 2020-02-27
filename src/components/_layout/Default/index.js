import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';
import Footer from '../Footer';

const DefaultLayout = ({ children, hiddenFooter }) => {
  return (
    <>
      <Wrapper noFooter={hiddenFooter}>
        <Header transparent={hiddenFooter} />
        <div>{children}</div>
        {!hiddenFooter && <Footer />}
      </Wrapper>
    </>
  );
};

export default DefaultLayout;
