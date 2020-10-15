import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import DeleteModal from './components/Delete';
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

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EmailIcon from '@material-ui/icons/Email';

import Button from '~/components/Button';
import FormModal from './components/Form';
import validationSchema from '~/validations/projectProfessor';
import EmptyMessage from '~/components/EmptyMessage';
import EmailModal from '~/components/EmailModal';
import Search from '~/components/Search';

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

const Participants = ({ location, isProfessor, isParticipant, isProject }) => {
  const [allProfessors, setAllProfessors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [users, setUsers] = useState({
    professors: [],
    students: [],
  });
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [displayUser, setDisplayUsers] = useState([]);

  React.useEffect(() => {
    setDisplayUsers(users);
  }, [users]);
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
          style={{ color: '#D50000', cursor: 'pointer' }}
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

  const [modalParams, setModalParams] = useState({});
  const { user } = React.useCallback(useUserContext(), []);

  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);

  const fetchUsers = async () => {
    const response = await api.get(`projects/${projectId}/users`);

    const userList = response.data;
    setUsers(userList);
  };

  const fetchAllProfessors = async () => {
    const response = await api.get('professors', {
      params: { projectId, destination: isProject ? 'MOBILITY' : 'IINTOS' },
    });

    setAllProfessors(response.data);
  };

  /**
   * Gets the schools associated with this project
   */
  const fetchSchools = async () => {
    const response = await api.get(`/projects/${projectId}/schools`);

    const list = response.data; // all the schools

    // Map the id of the schools
    const formattedSchoolsProject = list.map(({ schoolId, school }) => ({
      id: schoolId,
      name: school.name,
    }));

    setSchools(formattedSchoolsProject);
  };

  useState(() => {
    fetchUsers();
    fetchAllProfessors();
    fetchSchools();
  }, []);

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`projectUser/${id}`);
      setModalOpen(false);
      toast.success('Participant removed with success!');
      fetchUsers();
      fetchAllProfessors();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleDeleteRow = row => {
    setModalParams({
      initialValues: row,
      onSubmit: () => handleDelete(row?.id || row?.professor?.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this participant?',
    });

    setModalOpen('delete');
  };

  const handleCreate = async ({
    userId,
    studentName,
    schoolId,
    coordinator,
  }) => {
    try {
      await api.post('projectUser', {
        userId,
        studentName,
        projectId,
        schoolId,
        coordinator,
      });
      setModalOpen(false);
      fetchUsers();
      setAllProfessors(allProfessors.filter(prof => prof.id !== +userId));
      toast.success('Participant add in project with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
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
    const initialValues = {
      sendEmail: user.email,
      recEmail: row.professor.email,
    };

    setModalParams({
      initialValues,
      onSubmit: handleEmail,
      submitText: 'Send',
      modalTitle: 'What do you want to tell this person?',
    });

    setModalOpen('email');
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>{isProject ? 'Teachers' : 'Partners'}</h1>
          <span>
            {!isProfessor && isParticipant && (
              <Button
                title={isProject ? 'Add Teacher' : 'Add Partner'}
                type="button"
                onClick={handleCreateUser}
              />
            )}
            <Search
              setDisplay={setDisplayUsers}
              displayOg={users}
              placeholder={
                isProject ? 'Search by Teacher' : 'Search by Partner'
              }
            />
          </span>
        </span>

        {users.professors.length === 0 && <EmptyMessage />}
        {users.professors.length !== 0 && (
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
      </ContainerWrap>
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
      <DeleteModal
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
};

export default withRouter(Participants);
