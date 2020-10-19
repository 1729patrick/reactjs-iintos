import React, { useState, useMemo } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import FileList from '~/components/FileList';

import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import Button from '~/components/Button';
import FormModal from './Form';
import DeleteModal from '../Delete';
import EmptyMessage from '~/components/EmptyMessage';
import Search from '~/components/Search';

import validationSchema from '~/validations/result';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 200, maxWidth: 250 },
  {
    id: 'files',
    label: 'Files',
    minWidth: 100,
  },
  {
    id: 'send',
    label: '',
    align: 'center',
    minWidth: 10,
    format: value => value.toFixed(2),
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
    maxHeight: window.innerHeight - 300,
  },
});

const Results = ({ isProfessor, isParticipant }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [activities, setActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const location = useLocation();
  const [error, setError] = useState();
  const [displayResult, setDisplayResult] = useState([]);

  const { user } = React.useCallback(useUserContext(), []);

  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);

  const fetchActivities = async () => {
    const response = await api.get(`projects/${projectId}/results`);
    setActivities(response.data);
    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    setDisplayResult(response.data);
  };

  useState(() => {
    fetchActivities();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // api call to post
  const handleUpdate = async (id, values) => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);

      await api.put(`results/${id}`, { ...values, files });
      setModalOpen(false);
      toast.success('Results updated with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async values => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);

      await api.post(`results`, { ...values, projectId, files });
      setModalOpen(false);
      toast.success('Result created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`results/${id}`);
      setModalOpen(false);
      toast.success('Results deleted with success!');
      fetchActivities();
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
      modalTitle: 'Are you sure you want to delete this Result?',
    });

    setModalOpen('delete');
  };

  const handleCreateResult = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Results',
    });

    setModalOpen('form');
  };

  const handleDetailRow = row => {
    setModalParams({
      initialValues: {
        ...row,
        files: [...row.files, ''],
        links: [...row.links, ''],
      },
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'Result',
    });

    setModalOpen('form');
  };

  // Send the request to create the news about this result
  const handleSendToNews = async values => {
    try {
      const response = await api.post('resultNews', {
        ...values,
        userId: user.id,
      });

      toast.success('News created with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <DeleteIcon
          style={{ color: '#D50000', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }
    if (column.id === 'send' && !isProfessor && isParticipant) {
      return (
        <Button
          title="Send News"
          type="button"
          onClick={() => handleSendToNews(row)}
        />
      );
    }
    if (column.id === 'see' && !isProfessor && isParticipant) {
      return (
        <EditIcon
          style={{ color: '#3F51B5', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }

    if (column.id === 'files') {
      if (value.length) return value.length ? <FileList files={value} /> : '';
    }

    return column.format && typeof value === 'number'
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Results</h1>
          <span>
            {!isProfessor && isParticipant && (
              <Button
                title="Create Result"
                type="button"
                onClick={handleCreateResult}
              />
            )}
            <Search
              setDisplay={setDisplayResult}
              displayOg={activities}
              placeholder="Search by Result"
            />
          </span>
        </span>
        {error === true && <EmptyMessage />}
        {error === false && (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayResult
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map(column => {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {getRowContent({ column, row })}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={activities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </ContainerWrap>
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
};

export default withRouter(Results);
