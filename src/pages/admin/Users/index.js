import React, { useMemo, useCallback } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from '~/styles/Sidebar';

import Schools from './components/Schools';
import Users from './components/Users';
import Approve from './components/Approve';

import { useUserContext } from '~/context/UserContext';

export default withRouter(({ location }) => {
  const { user } = useCallback(useUserContext(), []);

  const isUserIntos = useMemo(
    () => user?.role === 'IINTOS-Admin' || user?.role === 'IINTOS-Partner',
    [user]
  );

  const Children = () => {
    const route = location.pathname.replace('/users', '');
    if (route === '/schools') {
      return <Schools />;
    }

    if (route === '/approve') {
      return <Approve />;
    }

    return <Users />;
  };

  return (
    <Container>
      {!isUserIntos && (
        <Menu>
          <div>
            <NavLink to="/users" exact>
              Users
            </NavLink>
            <NavLink to="/users/schools">Schools</NavLink>
            <NavLink to="/users/approve">Approve Coordinators</NavLink>
          </div>
        </Menu>
      )}
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
