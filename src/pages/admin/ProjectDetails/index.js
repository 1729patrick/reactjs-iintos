import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

import api from '~/services/api';
import { Container, Menu, Content, Title } from './styles';

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
  const [isProfessor, setIsProfessor] = useState(true);
  const location = useLocation();

  const type = useMemo(() => {
    const { pathname } = location;
    // eslint-disable-next-line no-unused-vars
    const [_, route] = pathname.split('/');

    return route;
  }, [location]);

  const projectId = useMemo(() => computedMatch.params.id, [
    computedMatch.params.id,
  ]);

  // if isn't a professor can edit
  useEffect(() => {
    (async () => {
      const response = await api.get(
        `projectUser/${projectId}/permissions/edit`
      );

      setIsProfessor(user?.role === 'Professor' && !response.data.canEdit);
    })();
  }, [projectId, user]);

  const isProject = useMemo(() => type === 'projects', [type]);

  const isParticipant = useMemo(
    () =>
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      schools.includes(school?.id),
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
    const route = location.pathname.replace(
      `/${type}/details/${projectId}`,
      ''
    );
    if (route === '/participants') {
      return (
        <Participants
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          isProject={isProject}
        />
      );
    }
    if (route === '/activities') {
      return (
        <Activity
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          isProject={isProject}
        />
      );
    }
    if (route === '/results') {
      return (
        <Results
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          isProject={isProject}
        />
      );
    }
    if (route === '/schools') {
      return (
        <Schools
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          refreshParticipants={fetchSchools}
          isProject={isProject}
        />
      );
    }
    // By default, the content from the IPS will appear
    return (
      <Details
        initialValues={projects}
        isProfessor={isProfessor}
        isParticipant={isParticipant}
        isProject={isProject}
      />
    );
  }, [
    fetchSchools,
    isParticipant,
    isProfessor,
    projectId,
    projects,
    location,
    type,
    isProject,
  ]);

  return (
    <Container>
      <Menu>
        <Title>{projects.title}</Title>
        <div>
          <NavLink to={`/${type}/details/${projectId}/`} exact>
            Details
          </NavLink>
          {isProject && (
            <NavLink to={`/${type}/details/${projectId}/schools`}>
              Schools
            </NavLink>
          )}
          <NavLink to={`/${type}/details/${projectId}/participants`}>
            Participants
          </NavLink>
          <NavLink to={`/${type}/details/${projectId}/activities`}>
            Activity
          </NavLink>
          <NavLink to={`/${type}/details/${projectId}/results`}>
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
