import React, { useMemo, useState } from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

import api from '~/services/api';
import { Container, Menu, Content } from './styles';

import Activity from './components/Activity';
import Details from './components/Details';
import Participants from './components/Participants';
import Results from './components/Results';
import Schools from './components/Schools';

export default withRouter(({ computedMatch }) => {
  const projectId = useMemo(() => computedMatch.params.id, [
    computedMatch.params.id,
  ]);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await api.get(`projects/${projectId}`);
    setProjects(response.data);
  };

  useState(() => {
    fetchProjects();
  }, []);

  const Children = () => {
    const location = useLocation();

    const route = location.pathname.replace(`/project/${projectId}`, '');

    if (!route) {
      return <Details initialValues={projects} />;
    }
    if (route === '/participants') {
      return <Participants />;
    }
    if (route === '/activities') {
      return <Activity />;
    }
    if (route === '/results') {
      return <Results />;
    }
    if (route === '/schools') {
      return <Schools />;
    }

    // By default, the content from the IPS will appear
    return <Details initialValues={projects} />;
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to={`/project/${projectId}/`} exact>
            Details
          </NavLink>
          <NavLink to={`/project/${projectId}/activities`}>Activity</NavLink>
          <NavLink to={`/project/${projectId}/schools`}>Schools</NavLink>
          <NavLink to={`/project/${projectId}/participants`}>
            Participants
          </NavLink>
          <NavLink to={`/project/${projectId}/results`}>Results</NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
