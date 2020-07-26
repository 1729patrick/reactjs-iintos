import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { isBefore, format } from 'date-fns';
import { withRouter, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import Button from '~/components/Button';

import { Container, Menu, Content } from './styles';
import api from '~/services/api';
import FormModal from './components/Form';
import DeleteModal from './components/Delete';
import MyProject from './components/MyProject';
import SearchProject from './components/SearchProject';
import { useUserContext } from '~/context/UserContext';

import validationSchema from '~/validations/project';

const projectColumns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'goal', label: 'Goal', minWidth: 200 },
  {
    id: 'ageRangeStart',
    format: value => `${value.ageRangeStart} - ${value.ageRangeEnd}`,
    label: 'Age Range',
    minWidth: 100,
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 120,
  },
  {
    id: 'endDate',
    label: 'Limit Date',
    minWidth: 120,
  },
  { id: 'type', label: 'Mobility Type', minWidth: 100 },
  {
    id: 'campaing',
    label: 'Campaing',
    minWidth: 50,
    format: value => (value ? 'Yes' : 'No'),
  },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
    format: value => value.toFixed(2),
  },
  {
    id: 'delete',
    label: '',
    align: 'center',
    minWidth: 50,
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: window.innerHeight - 270,
  },
});

const Projects = ({ history, location, columns = projectColumns }) => {
  const { user } = useCallback(useUserContext(), []);

  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState(false);

  const route = useMemo(() => location.pathname.replace('/projects', ''), [
    location.pathname,
  ]);

  const isProfessor = useMemo(
    () =>
      user?.role === 'Teacher' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'IINTOS-Partner',
    [user]
  );

  const isGroupAdmin = useMemo(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const fetchProjects = async avaliable => {
    const response = await api.get('projects', {
      params: { avaliable, destination: 'MOBILITY' },
    });

    if (response.data) {
      const formattedProjects = response.data.map(project => ({
        ...project,
        isBeforeToday: isBefore(new Date(project.endDate), new Date()),
        endDate: project.endDate
          ? format(new Date(project.endDate), 'yyyy-MM-dd')
          : '',
        startDate: project.startDate
          ? format(new Date(project.startDate), 'yyyy-MM-dd')
          : '',
      }));

      // sort the projects by date and by if is campaing
      const pro = formattedProjects
        .sort((project1, project2) => {
          return project1.startDate > project2.startDate;
        })
        .sort((x, y) => {
          return x.campaing;
        })
        .reverse();

      setProjects(pro);
      if (formattedProjects.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  useEffect(() => {
    fetchProjects(route === '/search');
  }, [route]);

  const handleCreate = async values => {
    try {
      await api.post('projects', values);
      setModalOpen(false);
      toast.success('Project created with success!');
      fetchProjects();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`projects/${id}`);
      setModalOpen(false);
      toast.success('Project deleted with success!');
      fetchProjects();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleDeleteRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: () => handleDelete(row.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this project?',
    });

    setModalOpen('delete');
  };

  const handleCreateProjects = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Project',
    });

    setModalOpen('form');
  };

  const handleDetailRow = row => {
    history.push(`/projects/details/${row.id}`);
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isProfessor) {
      return (
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }

    if (column.id === 'see') {
      return (
        <Button
          title="Show"
          style={{ color: 'rgb(11, 31, 63)', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }
    if (column.id === 'ageRangeStart') {
      return column.format(row);
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };

  const Children = () => {
    if (route === '/search') {
      return (
        <SearchProject
          isProfessor={isProfessor}
          handleCreateProject={handleCreateProjects}
          columns={columns.filter(({ id }) => id !== 'delete')}
          projects={projects}
          error={error}
          getRowContent={getRowContent}
          useStyles={useStyles}
        />
      );
    }

    return (
      <MyProject
        isProfessor={isProfessor}
        handleCreateProject={handleCreateProjects}
        columns={columns}
        projects={projects}
        error={error}
        getRowContent={getRowContent}
        useStyles={useStyles}
        title={isGroupAdmin ? 'Projects' : 'My Projects'}
      />
    );
  };

  return (
    <Container>
      {!isGroupAdmin && (
        <Menu noMarginTop={!route}>
          <div>
            <NavLink to="/projects" exact>
              My Projects
            </NavLink>
            {!isProfessor && (
              <NavLink to="/projects/search">Find Project’s</NavLink>
            )}
          </div>
        </Menu>
      )}
      <Content>
        <Children />
        <FormModal
          open={modalOpen === 'form'}
          setOpen={setModalOpen}
          {...modalParams}
          isProject
        />
        <DeleteModal
          open={modalOpen === 'delete'}
          setOpen={setModalOpen}
          {...modalParams}
        />
      </Content>
    </Container>
  );
};

export default withRouter(Projects);
