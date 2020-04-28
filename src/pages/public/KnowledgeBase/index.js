import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

import PublicAreaIntroduction from './components/PublicAreaIntroduction';
import HowToRegisterCoordinator from './components/HowToRegister';
import CreateMobilityProject from './components/CreatingProject';
import CreatePartner from './components/CreatePartnership';
import RegisterTeacher from './components/RegisterTeacher';
import CaseStudy1 from './components/CaseStudy1';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/knowledge', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/knowledge/PublicAreaIntroduction');
    }
  }, [route, history]);

  const Children = () => {
    if (route === '/PublicAreaIntroduction') {
      return <PublicAreaIntroduction />;
    }
    if (route === '/HowToRegisterCoordinator') {
      return <HowToRegisterCoordinator />;
    }
    if (route === '/CreateMobilityProject') {
      return <CreateMobilityProject />;
    }
    if (route === '/CreatePartner') {
      return <CreatePartner />;
    }
    if (route === '/RegisterTeacher') {
      return <RegisterTeacher />;
    }
    if (route === '/CaseStudy1') {
      return <CaseStudy1 />;
    }
    // By default, the content from the IPS will appear
    return <PublicAreaIntroduction />;
  };
  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/knowledge/PublicAreaIntroduction">
            Public Area Introduction
          </NavLink>
          <NavLink to="/knowledge/HowToRegisterCoordinator">
            {' '}
            How to Register
          </NavLink>
          <NavLink to="/knowledge/CreateMobilityProject">
            How to Create a Mobility Project
          </NavLink>
          <NavLink to="/knowledge/CreatePartner">
            How to Create a Partnership
          </NavLink>
          <NavLink to="/knowledge/RegisterTeacher">
            How to Register as a teacher
          </NavLink>
          <NavLink to="/knowledge/CaseStudy1">
            Saramago Vallauri Case Study
          </NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
