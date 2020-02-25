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
  const [schools, setSchools] = useState([]);

  const projectId = useMemo(() => computedMatch.params.id, [
    computedMatch.params.id,
  ]);

  const isProfessor = useMemo(() => {
    const localUser = localStorage.getItem('user');

    if (localUser) {
      const user = JSON.parse(localUser);

      return user.role === 'Professor';
    }
  }, []);

  const isParticipant = useMemo(() => {
    const localSchool = localStorage.getItem('school');

    if (localSchool) {
      const school = JSON.parse(localSchool);
      if (!school) {
        return true;
      }
      return schools.includes(school.id);
    }
  }, [schools]);

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await api.get(`projects/${projectId}`);
    const project = {
      ...response.data,
      ageRange: `${response.data.ageRangeStart} - ${response.data.ageRangeEnd}`,
    };
    setProjects(project);
  };

  const fetchSchools = async () => {
    const response = await api.get(`/projects/${projectId}/schools`);
    setSchools(response.data.map(({ schoolId }) => schoolId));
  };

  useState(() => {
    fetchProjects();
    fetchSchools();
  }, []);

  const Children = () => {
    const location = useLocation();

    const route = location.pathname.replace(
      `/projects/details/${projectId}`,
      ''
    );
    if (route === '/participants') {
      return (
        <Participants isProfessor={isProfessor} isParticipant={isParticipant} />
      );
    }
    if (route === '/activities') {
      return (
        <Activity isProfessor={isProfessor} isParticipant={isParticipant} />
      );
    }
    if (route === '/results') {
      return (
        <Results isProfessor={isProfessor} isParticipant={isParticipant} />
      );
    }
    if (route === '/schools') {
      return (
        <Schools
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          refreshParticipants={fetchSchools}
        />
      );
    }

    // By default, the content from the IPS will appear
    return (
      <Details
        initialValues={projects}
        isProfessor={isProfessor}
        isParticipant={isParticipant}
      />
    );
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to={`/projects/details/${projectId}/`} exact>
            Details
          </NavLink>
          <NavLink to={`/projects/details/${projectId}/activities`}>
            Activity
          </NavLink>
          <NavLink to={`/projects/details/${projectId}/schools`}>
            Schools
          </NavLink>
          <NavLink to={`/projects/details/${projectId}/participants`}>
            Participants
          </NavLink>
          <NavLink to={`/projects/details/${projectId}/results`}>
            Results
          </NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
