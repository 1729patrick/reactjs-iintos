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
import EmailIcon from '@material-ui/icons/Email';

import Button from '~/components/Button';
import FormModal from './Form';
import validationSchema from '~/validations/projectProfessor';
import EmptyMessage from '~/components/EmptyMessage';
import EmailModal from '~/components/EmailModal';

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
    id: 'coordinator',
    label: 'Can change information for this project',
    minWidth: 100,
    format: value => (value ? 'Yes' : 'No'),
  },
  {
    id: 'emailIcon',
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

export default function Professors({
  users,
  allProfessors,
  handleCreate,
  modalOpen,
  setModalOpen,
  handleDeleteRow,
  modalParams,
  setModalParams,
  isProfessor,
  isParticipant,
  isProject,
  handleEmail,
  handleEmailRow,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getRowContent = ({ column, row }) => {
    const value = row.professor[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <RemoveCircleOutlineIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }
    if (column.id === 'emailIcon') {
      return (
        <EmailIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handleEmailRow(row)}
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
      validationSchema,
      initialValues: {},
      onSubmit: handleCreate,
      submitText: 'Add',
      modalTitle: isProject ? 'Add a new Teacher' : 'Add a new Partner',
    });

    setModalOpen('formProfessor');
  };

  return (
    <>
      <span>
        <h2>{isProject ? 'Teachers' : 'Partners'}</h2>

        {!isProfessor && isParticipant && (
          <Button
            title={isProject ? 'Add Teacher' : 'Add Partner'}
            type="button"
            onClick={handleCreateUser}
          />
        )}
      </span>
      {users.length === 0 && <EmptyMessage />}
      {users.length !== 0 && (
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
                        key={row.professor?.id}
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
        users={allProfessors}
        open={modalOpen === 'formProfessor'}
        setOpen={setModalOpen}
        isProject={isProject}
        {...modalParams}
      />
      <EmailModal
        open={modalOpen === 'email'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </>
  );
}
