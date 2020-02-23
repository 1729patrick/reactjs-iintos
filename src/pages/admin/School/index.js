import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './styles';

import Schools from './components/Schools';
import Users from './components/Users';
import Approve from './components/Approve';

export default withRouter(({ location }) => {
  const Children = () => {
    const route = location.pathname.replace('/school', '');
    if (route === '/users') {
      return <Users />;
    }

    if (route === '/approve') {
      return <Approve />;
    }

    return <Schools />;
  };
  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/school" exact>
            Detail
          </NavLink>
          <NavLink to="/school/users">Users</NavLink>
          <NavLink to="/school/approve">Approve Professors</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
