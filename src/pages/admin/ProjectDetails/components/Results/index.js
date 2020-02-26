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

import api from '~/services/api';
import { Container, ContainerWrap } from './styles';
import Button from '~/components/Button';
import FormModal from './Form';
import DeleteModal from '../Delete';

import validationSchema from '~/validations/result';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 200 },
  {
    id: 'files',
    label: 'Files',
    minWidth: 120,
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

const Results = ({ isProfessor, isParticipant }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activities, setActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const location = useLocation();

  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);

  const fetchActivities = async () => {
    const response = await api.get(`projects/${projectId}/results`);
    setActivities(response.data);
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
      },
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'Result',
    });

    setModalOpen('form');
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }

    if (column.id === 'see' && !isProfessor && isParticipant) {
      return (
        <EditIcon
          style={{ color: 'rgb(11, 31, 63)', cursor: 'pointer' }}
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

          {!isProfessor && isParticipant && (
            <Button
              title="Create Result"
              type="button"
              onClick={handleCreateResult}
            />
          )}
        </span>
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
                {activities
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
