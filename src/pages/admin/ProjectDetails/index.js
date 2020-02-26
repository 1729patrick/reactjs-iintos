import React, { useMemo, useState, useCallback } from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

import api from '~/services/api';
import { Container, Menu, Content } from './styles';

import Activity from './components/Activity';
import Details from './components/Details';
import Participants from './components/Participants';
import Results from './components/Results';
import Schools from './components/Schools';
import { useUserContext } from '~/context/UserContext';

export default withRouter(({ computedMatch }) => {
  const { user, school } = useCallback(useUserContext(), []);
  const [schools, setSchools] = useState([]);
  const [projects, setProjects] = useState([]);

  const projectId = useMemo(() => computedMatch.params.id, [
    computedMatch.params.id,
  ]);

  const isProfessor = useMemo(() => user?.role === 'Professor', [user]);

  const isParticipant = useMemo(
    () => user?.role === 'Admin' || schools.includes(school?.id),
    [user, school, schools]
  );

  const fetchProjects = async () => {
    const response = await api.get(`projects/${projectId}`);
    const project = {
      ...response.data,
      ageRange: `${response.data.ageRangeStart} - ${response.data.ageRangeEnd}`,
    };
    setProjects(project);
  };

  const fetchSchools = useCallback(async () => {
    const response = await api.get(`/projects/${projectId}/schools`);
    setSchools(response.data.map(({ schoolId }) => schoolId));
  }, [projectId]);

  useState(() => {
    fetchProjects();
    fetchSchools();
  }, []);

  const Children = useCallback(() => {
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
  }, [fetchSchools, isParticipant, isProfessor, projectId, projects]);

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
