import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import ConfirmModal from './modals/Confirm';
import EmptyMessage from '~/components/EmptyMessage';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'E-mail', minWidth: 150 },
  {
    id: 'school',
    label: 'School',
    minWidth: 200,
  },
  {
    id: 'certificate',
    label: 'Certificate',
    minWidth: 100,
    format: value =>
      !value ? (
        ''
      ) : (
        <a href={value} target="__blank">
          Open File
        </a>
      ),
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
    id: 'up',
    label: '',
    align: 'center',
    minWidth: 50,
    format: value => value.toFixed(2),
  },
  {
    id: 'down',
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

export default function Approve() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState();

  const fetchUsers = async () => {
    const response = await api.get('users', {
      params: { role: 'Professor' },
    });
    setUsers(response.data);
    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useState(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActveUser = async (user, active, reasonInactive) => {
    try {
      const formattedUser = { ...user, active, reasonInactive };
      await api.put(`users/${user.id}`, formattedUser);
      setModalOpen(false);

      setUsers(
        users.map(u => {
          if (u.id === user.id) {
            return formattedUser;
          }

          return u;
        })
      );

      toast.success('User updated with success!');
      fetchUsers();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleOpenConfirm = (user, active) => {
    setModalParams({
      onSubmit: reason => handleActveUser(user, active, reason),
      active,
      modalTitle: `Are you sure you want to ${
        active ? 'active' : 'inactive'
      } this teacher?`,
    });

    setModalOpen(true);
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'up') {
      return (
        <ThumbUp
          style={{
            color: 'rgb(23, 179, 14)',
            cursor:
              !row.active || row.createdAt === row.updatedAt
                ? 'pointer'
                : 'normal',
            opacity: !row.active || row.createdAt === row.updatedAt ? 1 : 0.3,
          }}
          onClick={() =>
            (!row.active || row.createdAt === row.updatedAt) &&
            handleOpenConfirm(row, true)
          }
        />
      );
    }

    if (column.id === 'down') {
      return (
        <ThumbDown
          style={{
            color: '#D50000',
            cursor:
              row.active || row.createdAt === row.updatedAt
                ? 'pointer'
                : 'normal',
            opacity: row.active || row.createdAt === row.updatedAt ? 1 : 0.3,
          }}
          onClick={() =>
            (row.active || row.createdAt === row.updatedAt) &&
            handleOpenConfirm(row, false)
          }
        />
      );
    }

    return column.format &&
      (typeof value === 'number' ||
        typeof value === 'boolean' ||
        column.id === 'certificate')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Approve Teachers</h1>
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
                  {users
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
      <ConfirmModal open={modalOpen} setOpen={setModalOpen} {...modalParams} />
    </Container>
  );
}
