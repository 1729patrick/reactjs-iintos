import React, { useEffect, useState, useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './styles';

import Schools from './components/Schools';
import Users from './components/Users';
import Approve from './components/Approve';

export default withRouter(({ location }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem('user');

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const hasCoordinator = useMemo(() => user.role === 'Coordinator', [user]);

  const Children = () => {
    const route = location.pathname.replace('/school', '');
    if (route === '/users') {
      return <Users hasCoordinator={hasCoordinator} />;
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
            Details
          </NavLink>
          <NavLink to="/school/users">Users</NavLink>
          {hasCoordinator && (
            <NavLink to="/school/approve">Approve Professors</NavLink>
          )}
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
