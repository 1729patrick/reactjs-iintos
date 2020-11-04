import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextareaAutosize,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format } from 'date-fns';
import api from '~/services/api';

import Button from '~/components/Button';

import { Detail } from './style';
import { PublicContainer as Container } from '~/styles/Sidebar';
import FormModal from './components/Form';
import DeleteModal from './components/Delete';
import validationSchema from '~/validations/news';
import { useUserContext } from '~/context/UserContext';
import FileList from '~/components/FileList';

export default withRouter(({ location, history }) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const { user } = useCallback(useUserContext(), []);

  const isGroupAdmin = useMemo(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const fetchResults = useCallback(async () => {
    const response = await api.get('news');

    setResults(response.data);
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // does the api call to create a new result
  const handleCreate = async values => {
    try {
      await api.post('news', {
        ...values,
        imageId: values?.file?.saved?.id,
        userId: user.id,
      });

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

  const handleEditProject = new_ => {
    setModalParams({
      initialValues: new_,
      validationSchema,
      onSubmit: values => handleUpdate(new_.id, values),
      submitText: 'Save',
      modalTitle: 'News',
    });

    setModalOpen('form');
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`news/${id}`);
      setModalOpen(false);
      toast.success('News deleted with success!');

      fetchResults();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleDeleteRow = new_ => {
    setModalParams({
      initialValues: new_,
      validationSchema,
      onSubmit: () => handleDelete(new_.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this news?',
    });

    setModalOpen('delete');
  };

  console.log(user);

  return (
    <Container>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>News</h1>

        {isGroupAdmin && (
          <Button
            title="Create News"
            type="button"
            onClick={handleCreateProjects}
          />
        )}
      </span>

      {results.map(new_ => (
        <ExpansionPanel key={new_.id}>
          <ExpansionPanelSummary
            style={{ display: 'flex' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <h4>{new_.title}</h4>
              {(isGroupAdmin || new_?.author?.name == user?.name) && (
                <span
                  style={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                  }}
                >
                  {/* <h3
                    style={{ marginRight: 10, cursor: 'pointer' }}
                    onClick={() => handleEditProject(new_)}
                  >
                    Edit
                  </h3> */}
                  <h3
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDeleteRow(new_)}
                  >
                    Delete
                  </h3>
                </span>
              )}
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
            <Detail>
              <img src={new_?.image?.url} />

              <TextareaAutosize disabled defaultValue={new_.description} />

              {new_?.links?.length && new_?.files?.length && (
                <div>
                  <FileList files={new_?.files || []} />
                  <br />
                  <FileList links={new_?.links || []} />
                  <br />
                  <br />
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>
                    Created by {new_?.author?.name} at{' '}
                    {format(new Date(new_.createdAt), 'yyyy-MM-dd')}
                  </span>
                </span>
              </div>
            </Detail>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

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
