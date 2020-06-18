import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import EmailIcon from '@material-ui/icons/Email';

import api from '~/services/api';
import { Container, ContainerWrap } from './styles';
import Button from '~/components/Button';
import Search from '~/components/Search';
import FormModal from './modals/Form';
import DeleteModal from './modals/Delete';
import { useUserContext } from '~/context/UserContext';
import EmptyMessage from '~/components/EmptyMessage';
import EmailModal from '~/components/EmailModal';
import validationSchema from '~/validations/user';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'E-mail', minWidth: 150 },
  {
    id: 'school',
    label: 'School',
    minWidth: 200,
  },
  {
    id: 'active',
    label: 'Active',
    minWidth: 100,
    format: value => (value ? 'Yes' : 'No'),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
    format: value => value.toFixed(2),
  },
  {
    id: 'emailIcon',
    label: '',
    align: 'center',
    minWidth: 50,
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
    maxHeight: window.innerHeight - 270,
  },
});

export default function Users() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [displayUser, setDiplayUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const { user } = useCallback(useUserContext(), []);
  const [error, setError] = useState(false);

  const isIIntosPartner = useMemo(() => {
    return user?.role === 'IINTOS-Partner';
  }, [user]);

  const fetchUsers = async () => {
    const response = await api.get('users');
    setUsers(response.data);
    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    setDiplayUser(response.data);
  };

  const fetchRoles = async () => {
    const response = await api.get('roles');
    setRoles(response.data);
  };

  const fetchSchools = async () => {
    const response = await api.get('schools');
    setSchools(response.data);
  };

  useEffect(() => {
    fetchRoles();
    fetchSchools();
    fetchUsers();
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
      await api.put(`users/${id}`, values);
      setModalOpen(false);
      toast.success('User updated with success!');
      fetchUsers();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async user => {
    try {
      await api.post('users', {
        user,
        school: { schoolId: user.schoolId },
      });
      setModalOpen(false);
      toast.success('User created with success!');
      fetchUsers();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`users/${id}`);
      setModalOpen(false);
      toast.success('User deleted with success!');
      fetchUsers();
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
      modalTitle: 'Are you sure you want to delete this user?',
    });

    setModalOpen('delete');
  };

  // Email Handlers
  const handleEmail = async values => {
    try {
      await api.post(`sendEmail`, values);
      setModalOpen(false);
      toast.success('Email sent with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleEmailRow = row => {
    const initialValues = { sendEmail: user.email, recEmail: row.email };
    setModalParams({
      initialValues,
      validationSchema,
      onSubmit: handleEmail,
      submitText: 'Send',
      modalTitle: `What do you want to tell to ${row.name}?`,
    });

    setModalOpen('email');
  };

  const handleCreateUser = () => {
    setModalParams({
      initialValues: {},
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new User',
    });

    setModalOpen('form');
  };

  const handleDetailRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'User',
    });

    setModalOpen('form');
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isIIntosPartner) {
      return (
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }
    if (column.id === 'emailIcon' && !isIIntosPartner) {
      return (
        <EmailIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handleEmailRow(row)}
        />
      );
    }

    if (column.id === 'see' && !isIIntosPartner) {
      return (
        <EditIcon
          style={{ color: 'rgb(11, 31, 63)', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
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
          <h1>Users</h1>
          <span>
            {!isIIntosPartner && (
              <Button
                title="Create User"
                type="button"
                onClick={handleCreateUser}
              />
            )}
            <Search
              setDisplay={setDiplayUser}
              displayOg={users}
              placeholder="Search by name"
            />
          </span>
        </span>

        {error && <EmptyMessage />}
        {!error && (
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
                  {displayUser
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
              count={users.length}
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
      <EmailModal
        open={modalOpen === 'email'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
}
