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
import VisibilityIcon from '@material-ui/icons/Visibility';

import { format } from 'date-fns';
import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import Button from '~/components/Button';
import Search from '~/components/Search';
import FormModal from './modals/Form';
import DeleteModal from './modals/Delete';
import DetailsModal from './modals/Details';
import EmptyMessage from '~/components/EmptyMessage';
import validationSchema from '~/validations/event2';

const columns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'description', label: 'Description', minWidth: 150 },
  {
    id: 'type',
    label: 'Type',
    minWidth: 200,
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
    format: value => (value ? 'Yes' : 'No'),
  },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
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
    maxHeight: window.innerHeight - 300,
  },
});

export default function Events() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [events, setEvents] = useState([]);
  const [displayEvent, setDiplayEvent] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState();

  const fetchEvents = async () => {
    const response = await api.get('events');
    setEvents(response.data);
    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    setDiplayEvent(response.data);
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
    fetchEvents();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // api call to post
  const handleUpdate = async (id, { sessions, ...event }) => {
    try {
      const eventFiles = event.files.filter(v => v).map(({ id }) => id);

      const ids = {};
      eventFiles.forEach(id => {
        ids[id] = true;
      });

      event = {
        ...event,
        files: Object.keys(ids),
      };

      sessions = sessions.map(session => {
        const sessionFiles = session.files.filter(v => v).map(({ id }) => id);

        const ids_ = {};
        sessionFiles.forEach(id => {
          ids_[id] = true;
        });

        return {
          ...session,
          files: Object.keys(ids_),
          links: session.links.filter(v => v),
        };
      });

      await api.put(`events/${id}`, { event, sessions });
      setModalOpen(false);
      toast.success('Event updated with success!');
      fetchEvents();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async ({ sessions, ...event }) => {
    try {
      const eventFiles = event.files.filter(v => v).map(({ id }) => id);

      const ids = {};
      eventFiles.forEach(id => {
        ids[id] = true;
      });

      event = {
        ...event,
        files: Object.keys(ids),
      };

      sessions = sessions.map(session => {
        const sessionFiles = session.files.filter(v => v).map(({ id }) => id);

        const ids_ = {};
        sessionFiles.forEach(id => {
          ids_[id] = true;
        });

        return {
          ...session,
          files: Object.keys(ids_),
          links: session.links.filter(v => v),
        };
      });
      await api.post('events', { sessions, event });
      setModalOpen(false);
      toast.success('Event created with success!');
      fetchEvents();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`events/${id}`);
      setModalOpen(false);
      toast.success('Event deleted with success!');
      fetchEvents();
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
      modalTitle: 'Are you sure you want to delete this event?',
    });

    setModalOpen('delete');
  };

  const handleCreateEvent = () => {
    setModalParams({
      initialValues: {
        files: [''],
        date: new Date().toISOString(),
        sessions: [
          { files: [''], date: new Date().toISOString(), links: [''] },
        ],
      },
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Event',
    });

    setModalOpen('form');
  };

  const handleEditRow = row => {
    setModalParams({
      initialValues: {
        ...row,
        files: [...row.files, ''],
        sessions: row.sessions.map(session => ({
          ...session,
          files: [...session.files, ''],
          links: session.links ? [...session.links, ''] : [''],
        })),
      },
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'Event',
    });

    setModalOpen('form');
  };

  const handleDetailsRow = row => {
    setModalParams({
      row,
    });

    setModalOpen('details');
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

    if (column.id === 'see') {
      return (
        <VisibilityIcon
          style={{ color: '#33B679', cursor: 'pointer' }}
          onClick={() => handleDetailsRow(row)}
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
          <h1>Events</h1>
          <span>
            <Button
              title="Create Event"
              type="button"
              onClick={handleCreateEvent}
            />
            <Search
              setDisplay={setDiplayEvent}
              displayOg={events}
              placeholder="Search event"
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
                  {displayEvent
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
}
