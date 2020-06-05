import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/ioffices', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/ioffices/forum');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/forum') {
      return null;
    }

    return () => null;
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/ioffices/forum">Forum</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
