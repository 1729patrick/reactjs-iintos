import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

export default withRouter(({ location, history }) => {
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
      <Content>{/* <Children /> */}</Content>
    </Container>
  );
});
