import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/iprojects', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/iprojects/news');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/news') {
      return null;
    }
    if (route === '/projects') {
      return null;
    }
    if (route === '/wiki') {
      return null;
    }

    return () => null;
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/iprojects/news">News</NavLink>
          <NavLink to="/iprojects/projects">Projects</NavLink>
          <NavLink to="/iprojects/wiki">Wiki</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
