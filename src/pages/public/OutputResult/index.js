import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUserContext } from '~/context/UserContext';
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
import VisibilityIcon from '@material-ui/icons/Visibility';

import { format } from 'date-fns';
import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import Button from '~/components/Button';
import Search from '~/components/Search';
import FormModal from './components/Form';
import DeleteModal from './components/Delete';
import DetailsModal from './components/Details';
import EmptyMessage from '~/components/EmptyMessage';
import validationSchema from '~/validations/output';
import FileList from '~/components/FileList';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 150 },
  {
    id: 'files',
    label: 'Files',
    minWidth: 100,
  },
  {
    id: 'edit',
    label: '',
    align: 'center',
    minWidth: 50,
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

export default withRouter(({ location, history }) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [events, setEvents] = useState([]);
  const [displayEvent, setDiplayEvent] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);

  const route = useMemo(() => location.pathname.replace('/results/', ''), [
    location,
  ]);
  const { user } = useCallback(useUserContext(), []);

  const fetchResults = useCallback(async () => {
    const response = await api.get('outputResults');

    const resultsList = response.data.map(result => ({
      id: result.id,
      title: result.title,
      description: result.description,
      link: `/results/${result.id}`,
      files: result.files,
    }));

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
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.post('outputResults', { ...values, files });

      setModalOpen(false);
      toast.success('Result created with success!');

      fetchResults();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // Function for the the creation of the
  const handleCreateRow = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Result',
    });

    setModalOpen('form');
  };

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

  const handleEditRow = row => {
    setModalParams({
      initialValues: {
        title: row.title,
        description: row.description,
        files: [...row.files, ''],
      },
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
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

  const handleDeleteRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: () => handleDelete(row.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this result?',
    });

    setModalOpen('delete');
  };

  const handleDetailsRow = row => {
    setModalParams({
      row,
    });

    setModalOpen('details');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete') {
      return (
        <DeleteIcon
          style={{ color: '#D50000', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }

    if (column.id === 'edit') {
      return (
        <EditIcon
          style={{ color: '#3F51B5', cursor: 'pointer' }}
          onClick={() => handleEditRow(row)}
        />
      );
    }

    if (column.id === 'files') {
      if (value.length) return value.length ? <FileList files={value} /> : '';
    }

    if (column.id === 'type') {
      return `${row.type?.charAt(0)?.toUpperCase()}${row.type?.slice(1)}`;
    }

    if (column.id === 'date') {
      return format(new Date(row.date), 'yyyy-MM-dd');
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };
  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Results</h1>
          <span>
            <Button
              title="Create Result"
              type="button"
              onClick={handleCreateRow}
            />
            {/* <Search
              setDisplay={setDi}
              displayOg={events}
              placeholder="Search event"
            /> */}
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
                  {results
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
              count={events.length}
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
        schools={schools}
        roles={roles}
        setOpen={setModalOpen}
        {...modalParams}
      />
      <DeleteModal
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        {...modalParams}
      />
      <DetailsModal
        open={modalOpen === 'details'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
});
