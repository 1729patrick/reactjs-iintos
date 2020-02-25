import React, { useState, useMemo, useEffect } from 'react';
import { isBefore, format } from 'date-fns';
import { withRouter, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import { Container, Menu, Content } from './styles';
import api from '~/services/api';
import FormModal from './components/Form';
import DeleteModal from './components/Delete';
import MyProject from './components/MyProject';
import SearchProject from './components/SearchProject';

import validationSchema from '~/validations/project';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'goal', label: 'Goal', minWidth: 200 },
  {
    id: 'ageRangeStart',
    format: value => `${value.ageRangeStart} - ${value.ageRangeEnd}`,
    label: 'Age Range',
    minWidth: 150,
  },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 150,
    format: value => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
  },
  {
    id: 'endDate',
    label: 'Limit Date',
    minWidth: 150,
    format: value => (value ? format(new Date(value), 'yyyy-MM-dd') : ''),
  },
  { id: 'type', label: 'Mobility Type', minWidth: 150 },
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
    maxHeight: window.innerHeight - 230,
  },
});

const Projects = ({ history, location }) => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const route = useMemo(() => location.pathname.replace('/projects', ''), [
    location.pathname,
  ]);

  const isProfessor = useMemo(() => {
    const localUser = localStorage.getItem('user');

    if (localUser) {
      const user = JSON.parse(localUser);

      return user.role === 'Professor';
    }
  }, []);

  const fetchProjects = async avaliable => {
    const response = await api.get('projects', { params: { avaliable } });

    if (response.data) {
      const formattedProjects = response.data.map(project => ({
        ...project,
        isBeforeToday: isBefore(new Date(project.endDate), new Date()),
      }));
      setProjects(formattedProjects);
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
      initialValues: {},
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
        <VisibilityIcon
          style={{ color: 'rgb(11, 31, 63)', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }
    if (column.id === 'ageRangeStart') {
      return column.format(row);
    }

    return column.format &&
      (typeof value === 'number' ||
        column.id === 'startDate' ||
        column.id === 'endDate')
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
        getRowContent={getRowContent}
        useStyles={useStyles}
      />
    );
  };

  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/projects" exact>
            My Projects
          </NavLink>
          {!isProfessor && (
            <NavLink to="/projects/search">Search Projects</NavLink>
          )}
        </div>
      </Menu>
      <Content>
        <Children />
        <FormModal
          open={modalOpen === 'form'}
          setOpen={setModalOpen}
          {...modalParams}
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
