import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container, Menu, Content } from './style';
import api from '~/services/api';
import Create from './components/CreateModal';
import Delete from './components/Delete';
import { useUserContext } from '~/context/UserContext';

const Privacy = () => {
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalParams, setModalParams] = React.useState({});
  const { user } = React.useCallback(useUserContext(), []);

  const isGroupAdmin = React.useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin'
    );
  }, [user]);
  /**
   * gets, async, all the public output
   */
  const fetchResults = React.useCallback(async () => {
    const response = await api.get('stem');
    const resultsList = response.data.map(result => ({
      id: result.id,
      title: result.title,
      link: result.link,
    }));

    setResults(resultsList);

    if (resultsList.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, []);

  // Function that opens the Help modal
  const onClickCreate = () => {
    setModalOpen('Create');
  };

  const onClickDelete = id => {
    setModalParams({
      onSubmit: values => handleDelete(id),
    });

    setModalOpen('delete');
  };

  const handleCreate = async values => {
    try {
      await api.post('stem', values);
      setModalOpen(false);
      toast.success('Stem link created with success!');
      fetchResults();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`stem/${id}`);
      setModalOpen(false);
      toast.success('Stem link deleted with success!');
      fetchResults();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  React.useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // stem example
  const exemple = { title: '', link: '' };

  return (
    <Container>
      <div>
        {isGroupAdmin() && (
          <AddCircleIcon
            fontSize="large"
            onClick={onClickCreate}
            style={{ color: '#0eb305', cursor: 'pointer' }}
          />
        )}
        <h1>STEM links</h1>
      </div>
      <p>
        {' '}
        Here you can find some Science, technology, engineering, and
        mathematics(STEM) link that can be interesting
      </p>{' '}
      <ul>
        {results.map(row => {
          return (
            <li>
              <a href={row.link}>{row.link}</a>
              {isGroupAdmin() && (
                <DeleteIcon
                  style={{ color: '#cb1010', cursor: 'pointer' }}
                  onClick={() => onClickDelete(row.id)}
                />
              )}
            </li>
          );
        })}
      </ul>
      <Create
        open={modalOpen === 'Create'}
        setOpen={setModalOpen}
        initialValues={exemple}
        onSubmit={handleCreate}
        modalTitle="Create a new Link"
      />
      <Delete
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        modalTitle="Do you wanna delete this Stem link"
        {...modalParams}
      />
    </Container>
  );
};

export default Privacy;
