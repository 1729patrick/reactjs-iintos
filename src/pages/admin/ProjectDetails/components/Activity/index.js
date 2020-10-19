import React, { useState, useMemo } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { isBefore, format } from 'date-fns';
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
import DoneIcon from '@material-ui/icons/Done';
import NotDoneIcon from '@material-ui/icons/Clear';

import api from '~/services/api';
import { ButtonContainer } from './styles';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import Button from '~/components/Button';
import FormModal from './Form';
import MobilityStepsModal from './MobilityStepsModal';

import DeleteModal from '../Delete';
import FileList from '~/components/FileList';
import EmptyMessage from '~/components/EmptyMessage';
import Search from '~/components/Search';
import validationSchema from '~/validations/activity';

const allColumns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'startDate', label: 'Start Date', minWidth: 120 },
  { id: 'endDate', label: 'End Date', minWidth: 120 },
  { id: 'professorsStr', label: 'Teachers', minWidth: 150 },
  {
    id: 'files',
    label: 'Files',
    minWidth: 120,
  },
  {
    id: 'done', // trocar
    label: 'Done',
  },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
  },
  {
    id: 'delete',
    label: '',
    align: 'center',
    minWidth: 50,
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

const Activities = ({ isProfessor, isParticipant, isProject }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [activities, setActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState();
  const [displayActivity, setDisplayActivity] = useState([]);

  const columns = useMemo(
    () =>
      isProject
        ? allColumns
        : allColumns.map(column =>
            column.id === 'professors'
              ? { ...column, label: 'Participants' }
              : column
          ),
    [isProject]
  );

  const location = useLocation();
  const [users, setUsers] = useState([]);

  const [steps, setSteps] = useState({
    1: {
      title: 'Classes and student selection',
      description: `The selection of students and classes depends on the themes, ages and years of
      schooling chosen for the projects. Schools are responsible for establishing selection
      criteria. some are suggested as a reference. An example of Skills and personal
      competences that pupils should have:
      ·   The real motivation to take part in the project
      ·   Their reliability
      ·   Motivation to travel to a foreign country
      ·   Their real possibility to host a foreign partner
      ·   Their adaptability and flexibility
      ·   Their communication skills in English.
      During the selection process, some information should be collected from
      students that will be useful during mobility.

      · Allergies
      · Special medical treatments needed
      · Particular nutritional necessities
      · Their hobbies
      · Their qualities
      · Their defects
      · Their favourite subject matter.`,
    },
    2: {
      title: 'Analyse curricula',
      description: ` How to find the main idea of the project? You could compare:
      Curricula documents of each partner country.
      Standards for basic and/or secondary education.
      Subjects which are taught: STEM, languages, social sciences – history, citizenship education, ethics, etc.
      Topics taught in classes.
      Methods which are used by teaching/learning: CLIL, Inquiry-based learning, Project-based learning, etc.
      The ideas about the leisure and hobbies of the students/pupils.
      The life style of young people from each country.
      The age of students/pupils.
      `,
    },
    3: {
      title: 'Find the main idea of the project',
      description: `Brainstorming, Disscussion, Activation methods, Mind Maps, Problem-solving, etc.
      Future workshop (it is a time-consuming method, good to identify a problem, which followed by a critique of the current state which results in a vision of the problem solving and the idea implementation in practice – the most important part):
      1.	Preparation Phase: the method, its rules and the scheduled course of the workshop (in accordance with the participants) is introduced.
      2.	Critique phase: The problem is investigated critically and thoroughly. First of all, a visualised brainstorming is performed and a general and critical question concerning the problem is framed.
      3.	Fantasy or visionary phase: All participants try to work out a vision of the future, to draw a picture of future possibilities.
      4.	Implementation phase: The ideas found are checked and evaluated in regard to their practicability. Discussions are. made related to the first step to make in order to achieve the vision.
      `,
    },
    4: {
      title: 'Look for a partner',
      description: ` The search for the partner can be done on specific platforms of international programs, through contacts between partners of other programs or between schools.`,
    },
    5: {
      title: 'Search for financing',
      description: `The search for financing can occur at the beginning of the project using several specific programs for financing, among which erasmus + stands out. Smaller funding can also be raised to complement the main funding, and even logistical and material support.`,
    },
    6: {
      title: 'Virtual activities before the exchange',
      description: `Before the start of a mobility, schools must develop distance activities in a virtual way. These activities can be planning, or even preparatory tasks for the activities to be carried out in person.
      These activities can be carried out using e-mails and also Skype conversations, to further increase collaboration and mutual esteem between students and teachers.
      `,
    },
    7: {
      title: 'Exchange activity selection',
      description: `The selection of activities to be developed will be based on the theme of mobility or project. There will be one or more themes around which students and teachers will plan and develop activities.
      The selection of topics will be based on the information collected during the curriculum analysis phase.
      `,
    },
    8: {
      title: 'Virtual exchange with colleagues',
      description: `After defining the group of participants in the mobility exchange, the teachers of the two schools decide and plan the activities to be carried out in the first mobility. A curricular analysis has already been carried out to identify common subjects in the curricula and in the moments of virtual exchanges and work sessions, other aspects related to the organization of mobility are also addressed.`,
    },
    9: {
      title: 'Areas or themes selection',
      description: `The selection of themes or areas is carried out after the schools involved have carried out the curriculum analysis. An area could be chosen, for example STEM or a theme such as the history of the European Union.`,
    },
    10: {
      title: 'Virtual introduction of students',
      description: `After the planning activities between teachers, there is a virtual presentation phase for students and teachers. Previously, teachers match students for future mobility. In this session, students introduce themselves to the group in general and to their mobility partner. This moment can open possibilities for students to communicate with each other until the moment of their first mobility.`,
    },
  });

  const handleToggle = ({ target }) => {
    const x = steps[target.name];
    x.checked = target.checked;
    setSteps(x);
  };

  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);

  const fetchUsers = async () => {
    const response = await api.get(`projects/${projectId}/users`);

    const users = response.data?.map(({ id, name }) => ({
      id,
      name,
    }));

    setUsers(users);
  };

  // opens the modal
  const handleMobilitySteps = async () => {
    setModalParams({
      onSubmit: handleCreateMobilityStep,
      submitText: 'Create',
      handleToggle,
      steps,
      users,
    });

    setModalOpen('step');
  };

  // gets all the project's activities
  const fetchActivities = async () => {
    const response = await api.get(`projects/${projectId}/activities`);

    if (response.data) {
      const formattedActivities = response.data.map(activity => ({
        ...activity,
        isBeforeToday: isBefore(new Date(activity.endDate), new Date()),
        endDate: activity.endDate
          ? format(new Date(activity.endDate), 'yyyy-MM-dd')
          : '',
        startDate: activity.startDate
          ? format(new Date(activity.startDate), 'yyyy-MM-dd')
          : '',
      }));
      if (formattedActivities.length === 0) {
        setError(true);
      } else {
        setError(false);
      }

      // sort the activities
      const sortedActivities = formattedActivities.sort(
        (project1, project2) => {
          return (
            Date.parse(project1.startDate) - Date.parse(project2.startDate)
          );
        }
      );

      setActivities(sortedActivities);
      setDisplayActivity(sortedActivities);
    }
  };

  const handleCreateMobilityStep = async steps => {
    const response = await api.get(`projects/${projectId}`);
    const project = response.data;

    try {
      steps = steps
        .filter(step => step.checked)
        .map(({ title }) => ({
          title,
          description: '',
          done: project.done,
          startDate: project.startDate,
          endDate: project.startDate,
          projectId,
        }));

      await api.post(`allActivities`, steps);

      setModalOpen(false);
      toast.success('Activity created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  useState(() => {
    fetchActivities();
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateDone = async (activityId, values) => {
    const professors = values.professors.map(elem => elem.id);

    const activity = {
      title: values.title,
      description: values.description,
      done: !values.done,
      startDate: values.startDate,
      endDate: values.endDate,
      projectId,
      links: values.links,
      professors,
    };

    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.put(`activities/${activityId}`, { ...activity, files });
      setModalOpen(false);
      toast.success('Activity updated with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to post
  const handleUpdate = async (id, values) => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.put(`activities/${id}`, { ...values, files, projectId });
      setModalOpen(false);
      toast.success('Activity updated with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async values => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.post(`activities`, { ...values, projectId, files });
      setModalOpen(false);
      toast.success('Activity created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`activities/${id}`);
      setModalOpen(false);
      toast.success('Activity deleted with success!');
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
      modalTitle: 'Are you sure you want to delete this activity?',
    });

    setModalOpen('delete');
  };

  const handleCreateActivity = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Activity',
      users,
    });

    setModalOpen('form');
  };

  // opens the update modal and initializes with the activity values
  const handleDetailRow = row => {
    const formattedRow = {
      ...row,
      files: [...row.files, ''],
      links: [...row.links, ''],
      professors: row.professors.length
        ? row.professors.map(({ id }) => id)
        : [undefined],
    };

    setModalParams({
      initialValues: formattedRow,
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'Activity',
      users,
    });

    setModalOpen('form');
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

    if (column.id === 'see' && !isProfessor && isParticipant) {
      return (
        <EditIcon
          style={{ color: '#3F51B5', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }
    if (column.id === 'done') {
      let x = '';
      const f = '';
      if (!isProfessor && isParticipant) {
        x = 'pointer';
      }
      return value ? (
        <DoneIcon
          style={{ color: '#00961e', cursor: x }}
          onClick={() =>
            !isProfessor && isParticipant ? handleUpdateDone(row.id, row) : null
          }
        />
      ) : (
        <NotDoneIcon
          style={{ color: '#D50000', cursor: x }}
          onClick={() =>
            !isProfessor && isParticipant ? handleUpdateDone(row.id, row) : null
          }
        />
      );
    }

    if (column.id === 'files') {
      if (value.length) return value.length ? <FileList files={value} /> : '';
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'object')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Activities</h1>

          {!isProfessor && isParticipant && (
            <ButtonContainer>
              <Search
                setDisplay={setDisplayActivity}
                displayOg={activities}
                placeholder="Search by Activity"
                marginRight={0}
              />
              <Button
                title="Create Activity"
                type="button"
                onClick={handleCreateActivity}
              />
              <Button
                title="Steps of Mobility"
                type="button"
                onClick={handleMobilitySteps}
              />
            </ButtonContainer>
          )}
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
                  {displayActivity
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
        isProject={isProject}
        {...modalParams}
      />
      <MobilityStepsModal
        open={modalOpen === 'step'}
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

export default withRouter(Activities);
