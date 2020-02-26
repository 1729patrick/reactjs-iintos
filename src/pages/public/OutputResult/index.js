import React, { useEffect, useState, useCallback } from 'react';
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

export default withRouter(({ location }) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const { user, setUser } = useCallback(useUserContext(), []);

  const groupAdmin = useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin'
    );
  }, [user]);
  /**
   * gets, async, all the public output
   */
  const fetchResults = async () => {
    const response = await api.get('outputResults');

    const resultsList = response.data.map(result => ({
      id: result.id,
      title: result.title,
      description: result.description,
      link: `/results/${result.id}`,
    }));

    setResults(resultsList);
  };
  useEffect(() => {
    fetchResults();
  }, []);
  useState(() => {
    fetchResults();
  }, []);

  // does the api call to create a new result
  const handleCreate = async values => {
    try {
      await api.post('outputResults', values);
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
      modalTitle: 'Create a new Project',
    });

    setModalOpen('form');
  };

  const Children = () => {
    const route = location.pathname.replace('/results/', '');

    const res = results.find(result => {
      return result.id === +route;
    });

    if (!res) {
      return null;
    }

    const handleUpdate = async (id, values) => {
      try {
        await api.put(`outputResults/${id}`, values);
        setModalOpen(false);
        fetchResults();
        toast.success('Result updated with success!');
      } catch (e) {
        toast.error(e?.response?.data?.error || 'Invalid request, try again');
      }
    };

    const handleEditProject = () => {
      setModalParams({
        initialValues: { title: res.title, description: res.description },
        validationSchema,
        onSubmit: values => handleUpdate(res.id, values),
        submitText: 'Save',
        modalTitle: 'Project',
      });
      // handleUpdate(row.id, values)
      console.log('ersdlkoiyutfhyuj');
      setModalOpen('form');
    };

    // api call to delete
    const handleDelete = async id => {
      try {
        await api.delete(`outputResults/${id}`);
        setModalOpen(false);
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
        modalTitle: 'Are you sure you want to delete this project?',
      });

      setModalOpen('delete');
    };

    return (
      <Result
        id={res.id}
        title={res.title}
        description={res.description}
        handleEditProject={handleEditProject}
        handleDeleteRow={handleDeleteRow}
      />
    );
    // return <Result title="title" description="{x.description} " />;
  };

  return (
    <Container>
      <Menu>
        <div>
          {results.map(row => {
            return <NavLink to={row.link}>{row.title}</NavLink>;
          })}
          {groupAdmin() && (
            <Button
              title="Add New Result"
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
/**
 *  <NavLink to="/results/1">Curricula analysis and comparison</NavLink>
          <NavLink to="/results/2">
            CMS and TMS web-based platform and database implementation
          </NavLink>
          <NavLink to="/results/3">Pilot schools activities e-books</NavLink>
          <NavLink to="/results/4">
            User's guide for international office in school implementation
          </NavLink>
 */
