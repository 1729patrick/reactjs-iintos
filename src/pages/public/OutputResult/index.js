import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Result from './components/Result';
import { Container, Menu, Content } from './style';
import Button from '~/components/Button';
import FormModal from './components/Form';
import DeleteModal from './components/Delete';
import validationSchema from '~/validations/result';
import { useUserContext } from '~/context/UserContext';

export default withRouter(({ location, history }) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const route = useMemo(() => location.pathname.replace('/results/', ''), [
    location,
  ]);
  const { user } = useCallback(useUserContext(), []);

  const isGroupAdmin = useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin'
    );
  }, [user]);
  /**
   * gets, async, all the public output
   */
  const fetchResults = useCallback(async () => {
    const response = await api.get('outputResults');

    const resultsList = response.data.map(result => ({
      id: result.id,
      title: result.title,
      description: result.description,
      link: `/results/${result.id}`,
      files: result.files,
    }));

    if ((!route || route === '/results') && resultsList[0]?.link)
      history.push(resultsList[0]?.link);
    setResults(resultsList);
  }, [route, history]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // does the api call to create a new result
  const handleCreate = async values => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      const response = await api.post('outputResults', { ...values, files });

      if (response.data) {
        history.push(`/results/${response.data.id}`);
      }
      setModalOpen(false);
      toast.success('Result created with success!');

      fetchResults();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // Function for the the creation of the
  const handleCreateProjects = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Result',
    });

    setModalOpen('form');
  };

  const Children = () => {
    const res = results.find(result => {
      return result.id === +route;
    });

    if (!res) {
      return null;
    }

    const handleUpdate = async (id, values) => {
      try {
        const files = values.files?.filter(f => f).map(({ id }) => id);
        await api.put(`outputResults/${id}`, { ...values, files });
        setModalOpen(false);
        fetchResults();
        toast.success('Result updated with success!');
      } catch (e) {
        toast.error(e?.response?.data?.error || 'Invalid request, try again');
      }
    };

    const handleEditProject = () => {
      setModalParams({
        initialValues: {
          title: res.title,
          description: res.description,
          files: [...res.files, ''],
        },
        validationSchema,
        onSubmit: values => handleUpdate(res.id, values),
        submitText: 'Save',
        modalTitle: 'Result',
      });

      setModalOpen('form');
    };

    // api call to delete
    const handleDelete = async id => {
      try {
        await api.delete(`outputResults/${id}`);
        setModalOpen(false);
        history.push('/results');
        toast.success('Result deleted with success!');

        fetchResults();
      } catch (e) {
        toast.error(e?.response?.data?.error || 'Invalid request, try again');
      }
    };

    const handleDeleteRow = () => {
      setModalParams({
        initialValues: res,
        validationSchema,
        onSubmit: () => handleDelete(res.id),
        submitText: 'Save',
        modalTitle: 'Are you sure you want to delete this result?',
      });

      setModalOpen('delete');
    };

    return (
      <Result
        id={res.id}
        title={res.title}
        files={res.files}
        description={res.description}
        handleEditProject={handleEditProject}
        handleDeleteRow={handleDeleteRow}
      />
    );
  };

  return (
    <Container>
      <Menu>
        <div>
          <h1>Results</h1>
          {results.map(row => {
            return (
              <NavLink key={row.link} to={row.link}>
                {row.title}
              </NavLink>
            );
          })}
          {isGroupAdmin() && (
            <Button
              title="Create Result"
              type="button"
              onClick={handleCreateProjects}
            />
          )}
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
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
    </Container>
  );
});
