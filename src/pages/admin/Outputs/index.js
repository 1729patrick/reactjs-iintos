import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

import { Container, Content } from '~/pages/admin/Projects/styles';
import api from '~/services/api';
import FormModal from '~/pages/admin/Projects/components/Form';
import DeleteModal from '~/pages/admin/Projects/components/Delete';
import MyProject from '~/pages/admin/Projects/components/MyProject';
import { useUserContext } from '~/context/UserContext';
import FileList from '~/components/FileList';

import validationSchema from '~/validations/output';

const outputColumns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 200 },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
  },
  {
    id: 'delete',
    label: '',
    align: 'center',
    minWidth: 50,
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
  const { user } = useCallback(useUserContext(), []);

  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const isProfessor = useMemo(() => user.role === 'Professor', [user]);

  const fetchProjects = async () => {
    const response = await api.get('projects', {
      params: { destination: 'IINTOS' },
    });

    if (response.data) {
      const formattedProjects = response.data.map(project => ({
        ...project,
        isBeforeToday: false,
      }));

      setProjects(formattedProjects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async values => {
    try {
      await api.post('projects', { ...values, type: 'Output' });
      setModalOpen(false);
      toast.success('Output created with success!');
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
      modalTitle: 'Are you sure you want to delete this output?',
    });

    setModalOpen('delete');
  };

  const handleCreateProjects = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Output',
    });

    setModalOpen('form');
  };

  const handleDetailRow = row => {
    history.push(`/outputs/details/${row.id}`);
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

    if (column.id === 'files') {
      if (value?.length) return value.length ? <FileList files={value} /> : '';
    }

    return column.format && typeof value === 'number'
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <Content>
        <MyProject
          title="Outputs"
          buttonCreateTitle="Create Output"
          isProfessor={isProfessor}
          handleCreateProject={handleCreateProjects}
          projects={projects}
          getRowContent={getRowContent}
          useStyles={useStyles}
          columns={outputColumns}
          type="outputs"
        />
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
