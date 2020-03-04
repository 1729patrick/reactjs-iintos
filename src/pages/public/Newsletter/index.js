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
import EmptyMessage from '~/components/EmptyMessage';

export default withRouter(({ location, history }) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState(false);

  const route = useMemo(() => location.pathname.replace('/news/', ''), [
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
    const response = await api.get('news');
    const resultsList = response.data.map(result => ({
      id: result.id,
      title: result.title,
      description: result.description,
      link: `/news/${result.id}`,
      image: result.image,
    }));

    if ((!route || route === '/news') && resultsList[0]?.link)
      history.push(resultsList[0]?.link);

    setResults(resultsList);

    if (resultsList.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [route, history]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // does the api call to create a new result
  const handleCreate = async values => {
    try {
      const response = await api.post('news', { ...values });

      if (response.data) {
        history.push(`/news/${response.data.id}`);
      }
      setModalOpen(false);
      toast.success('News created with success!');

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
      modalTitle: 'Create a new News',
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
        await api.put(`news/${id}`, { ...values });
        setModalOpen(false);
        fetchResults();
        toast.success('News updated with success!');
      } catch (e) {
        toast.error(e?.response?.data?.error || 'Invalid request, try again');
      }
    };

    const handleEditProject = () => {
      setModalParams({
        initialValues: {
          title: res.title,
          description: res.description,
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
        await api.delete(`news/${id}`);
        setModalOpen(false);
        history.push('/news');
        toast.success('News deleted with success!');

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
        modalTitle: 'Are you sure you want to delete this news?',
      });

      setModalOpen('delete');
    };

    return (
      <Result
        id={res.id}
        title={res.title}
        image={res.image}
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
          <span>
            <h1>Newsletter</h1>
            {isGroupAdmin() && (
              <Button
                title="Create News"
                type="button"
                onClick={handleCreateProjects}
              />
            )}
          </span>

          {results.map(row => {
            return (
              <NavLink key={row.link} to={row.link}>
                <p>{row.title}</p>
              </NavLink>
            );
          })}
        </div>
      </Menu>
      <Content>
        <Children />
        {error && <EmptyMessage />}
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
