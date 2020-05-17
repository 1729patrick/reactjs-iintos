import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';
import About from './Components/About';
import Partners from './Components/Partners';
import Products from './Components/Products';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/iproject', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/iproject/about');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/about') {
      return <About />;
    }
    if (route === '/partners') {
      return <Partners />;
    }
    if (route === '/products') {
      return <Products />;
    }

    return () => null;
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/iproject/about">About IIntos</NavLink>
          <NavLink to="/iproject/partners">IIntos Partners</NavLink>
          <NavLink to="/iproject/events">IIntos Events</NavLink>
          <NavLink to="/iproject/products">IIntos Products</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
