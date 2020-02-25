import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, ContainerWrap } from './styles';
import Button from '~/components/Button';
import FormModal from './modals/Form';
import DeleteModal from './modals/Delete';

import validationSchema from '~/validations/schoolProject';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'phone', label: 'Phone', minWidth: 150 },
  {
    id: 'country',
    label: 'Country',
    minWidth: 100,
    format: value => value.toLocaleString(),
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 100,
    format: value => value.toLocaleString(),
  },
  {
    id: 'postalCode',
    label: 'Postal Code',
    minWidth: 100,
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
    maxHeight: 440,
  },
});

export default function Schools({
  isProfessor,
  isParticipant,
  refreshParticipants,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schools, setSchools] = useState([]);
  const [allSchools, setAllSchools] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const location = useLocation();
  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);
  /**
   * Gets the schools associated with this project
   */
  const fetchSchools = async () => {
    const response = await api.get(`/projects/${projectId}/schools`);
    setSchools(response.data);
  };
  /**
   * Gets all the schools in the platform
   */
  const fetchAllSchools = async () => {
    const response = await api.get('/schools', {
      params: { all: isParticipant },
    });

    const list = response.data; // all the schools

    // Map the id of the schools
    const formattedSchoolsProject = schools.map(({ schoolId }) => schoolId);

    // filter out the new school in in the selection list
    const filterList = list.filter(
      schoolAux => !formattedSchoolsProject.includes(schoolAux.id)
    );

    setAllSchools(filterList);
  };

  useState(() => {
    fetchSchools();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = async ({ schoolId }) => {
    try {
      const values = { schoolId, projectId };
      await api.post('schoolProjects', values);
      setModalOpen(false);
      toast.success('School added with success!');
      fetchSchools();
      refreshParticipants();
      setAllSchools(allSchools.filter(prof => prof.id !== +schoolId));
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`schoolProjects/${id}`);
      setModalOpen(false);
      toast.success('School removed with success!');
      refreshParticipants();
      fetchSchools();
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
      modalTitle: 'Are you sure you want to remove this school?',
    });

    setModalOpen('delete');
  };

  const handleCreateSchool = () => {
    setModalParams({
      initialValues: {},
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Add a new School',
    });
    // Gets all the avaliable schools;
    fetchAllSchools();

    setModalOpen('form');
  };

  const getRowContent = ({ column, row }) => {
    const value = row.school[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <RemoveIcon
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

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Schools</h1>

          {!isProfessor && (
            <Button
              title="Add School"
              type="button"
              onClick={handleCreateSchool}
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
                {schools
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
            count={schools.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </ContainerWrap>
      <FormModal
        users={allSchools}
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
}
/**
 *
 */
