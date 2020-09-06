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

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Button from '~/components/Button';
import FormModal from './Form';
import validationSchema from '~/validations/projectStudent';
import EmptyMessage from '~/components/EmptyMessage';
import Search from '~/components/Search';

const columns = [
  { id: 'studentName', label: 'Name', minWidth: 200 },
  { id: 'school', label: 'School', minWidth: 150 },
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
    marginBottom: 20,
  },
  container: {
    maxHeight: window.innerHeight - 270,
  },
});

export default function Professors({
  users,
  handleCreate,
  modalOpen,
  setModalOpen,
  handleDeleteRow,
  modalParams,
  setModalParams,
  isProfessor,
  isParticipant,
  schools,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayUsers, setDisplayUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  React.useEffect(() => {
    setDisplayUsers(users);
  }, [users]);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <RemoveCircleOutlineIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };

  const handleCreateUser = () => {
    setModalParams({
      initialValues: {},
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Add',
      modalTitle: 'Add a new Student',
    });

    setModalOpen('formStudent');
  };

  return (
    <>
      <span>
        <h2>Students</h2>
        <span>
          <Search
            setDisplay={setDisplayUsers}
            displayOg={users}
            placeholder="Search by Students"
          />
        </span>
      </span>
      {users?.length === 0 && <EmptyMessage />}
      {users?.length !== 0 && (
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
                {displayUsers
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
      <FormModal
        open={modalOpen}
        setOpen={setModalOpen}
        schools={schools}
        {...modalParams}
      />
    </>
  );
}
