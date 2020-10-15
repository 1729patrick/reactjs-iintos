import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from '~/styles/Sidebar';
import News from './components/Newsletter';
import UserGuide from './components/UserGuide';
import About from './components/About';
import Stem from './components/Stem';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/iprojects', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/iprojects/about');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/news') {
      return <News />;
    }

    if (route === '/user-guide') {
      return <UserGuide />;
    }

    if (route === '/about') {
      return <About />;
    }

    if (route === '/stem') {
      return <Stem />;
    }

    return () => null;
  };

  const openForum = () => {
    window.open('https://iintoska2.ips.pt/forum/', '__blank');
  };

  const openWiki = () => {
    window.open('https://iintoska2.ips.pt/', '__blank');
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/iprojects/about">About International Projects</NavLink>
          <NavLink to="/iprojects/news">News</NavLink>
          <a style={{ cursor: 'pointer' }} onClick={openForum}>
            Forum
          </a>
          <a style={{ cursor: 'pointer' }} onClick={openWiki}>
            Wiki
          </a>

          <NavLink to="/iprojects/stem">STEM Resources</NavLink>

          <NavLink to="/iprojects/user-guide">User Guide</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
