import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { withRouter, NavLink, useLocation } from 'react-router-dom';

import api from '~/services/api';
import { Title } from './styles';

import { Container, Menu, Content } from '~/styles/Sidebar';

import Activity from './components/Activity';
import Details from './components/Details';
import Participants from './components/Participants';
import Results from './components/Results';
import Schools from './components/Schools';
import Requests from './components/Requests';
import { useUserContext } from '~/context/UserContext';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

export default withRouter(({ computedMatch }) => {
  const { user, school } = useCallback(useUserContext(), []);
  const [schools, setSchools] = useState([]);
  const [projects, setProjects] = useState([]);
  const [joinStatus, setJoinStatus] = useState('');
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

  // if isn't a Teacher can edit
  useEffect(() => {
    (async () => {
      const response = await api.get(
        `projectUser/${projectId}/permissions/edit`
      );

      setIsProfessor(user?.role === 'Teacher' && !response.data.canEdit);
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

  const fetchJoinStatus = useCallback(async () => {
    const response = await api.get(`/projects/${projectId}/partners/status`);

    if (!response.data) {
      setJoinStatus('active');
      return;
    }

    const { active, reasonInactive } = response.data;
    const inProgress = !active && !reasonInactive;
    const denied = !active && reasonInactive;

    const joinStatus = inProgress ? 'inProgress' : denied ? 'denied' : '';

    setJoinStatus(joinStatus);
  }, [projectId]);

  useState(() => {
    fetchProjects();
    fetchSchools();
    fetchJoinStatus();
  }, []);

  const onJoinProject = async () => {
    try {
      await api.post(`/projects/${projectId}/partners`);
      setJoinStatus('inProgress');
      toast.success('Request submitted with success!');
    } catch (e) {
      toast.error('Invalid request, try again');
    }
  };

  const onShowDeniedReason = async () => {};

  const onCancelJoin = async () => {
    try {
      await api.delete(`/projects/${projectId}/partners`);
      setJoinStatus('active');
      toast.success('Request canceled with success!');
    } catch (e) {
      toast.error('Invalid request, try again');
    }
  };

  const mountJoin = () => {
    if (isParticipant || (!isParticipant && isProfessor)) {
      return null;
    }

    if (joinStatus === 'active')
      return (
        <Button title="Join Project" type="button" onClick={onJoinProject} />
      );

    if (joinStatus === 'denied')
      return (
        <Button
          title="Request Denied"
          type="button"
          onClick={onShowDeniedReason}
          color="#D50000"
        />
      );

    if (joinStatus === 'inProgress')
      return (
        <Button
          title="Cancel Request"
          type="button"
          onClick={onCancelJoin}
          color="#999"
        />
      );
  };

  const Children = useCallback(() => {
    const route = location.pathname.replace(
      `/${type}/details/${projectId}`,
      ''
    );
    if (route === '/partners') {
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

    if (route === '/requests') {
      return (
        <Requests
          isProfessor={isProfessor}
          isParticipant={isParticipant}
          isProject={isProject}
          projectId={projectId}
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
          <NavLink to={`/${type}/details/${projectId}/partners`}>
            {isProject ? 'Teachers' : 'Partners'}
          </NavLink>
          <NavLink to={`/${type}/details/${projectId}/activities`}>
            Activity
          </NavLink>
          <NavLink to={`/${type}/details/${projectId}/results`}>
            Results
          </NavLink>
          {isParticipant && !isProfessor && (
            <NavLink to={`/${type}/details/${projectId}/requests`}>
              Join Requests
            </NavLink>
          )}
        </div>

        {mountJoin()}
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
