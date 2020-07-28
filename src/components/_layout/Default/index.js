import React from 'react';

import { Wrapper } from '../styles';
import Header from './Header';
import Footer from '../Footer';

const DefaultLayout = ({ children, hiddenFooter, hiddenHeader }) => {
  return (
    <>
      <Wrapper noFooter={hiddenFooter}>
        {!hiddenHeader && <Header transparent={hiddenFooter} />}
        <div>{children}</div>
        {!hiddenFooter && <Footer />}
      </Wrapper>
    </>
  );
};

export default DefaultLayout;
