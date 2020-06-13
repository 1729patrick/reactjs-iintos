import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

import Policy from './components/Policy';
import Goals from './components/Goals';
import InternationalCordinator from './components/InternationalCordinator';
import Management from './components/Management';
import UserGuide from './components/UserGuide';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location?.pathname.replace('/ioffices', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/ioffices/policy');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/policy') {
      return <Policy />;
    }

    if (route === '/goals') {
      return <Goals />;
    }

    if (route === '/international-coordinator') {
      return <InternationalCordinator />;
    }

    if (route === '/management') {
      return <Management />;
    }

    if (route === '/user-guide') {
      return <UserGuide />;
    }

    return () => null;
  };

  const openForum = () => {
    window.open('https://iintoska2.ips.pt/forum/', '__blank');
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/ioffices/policy">School policy plan</NavLink>
          <NavLink to="/ioffices/goals">Goals and organization</NavLink>
          <NavLink to="/ioffices/international-coordinator">
            International coordinator
          </NavLink>
          <NavLink to="/ioffices/management">Management</NavLink>
          <a style={{ cursor: 'pointer' }} onClick={openForum}>
            Forum
          </a>
          <NavLink to="/ioffices/user-guide">User Guide</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
