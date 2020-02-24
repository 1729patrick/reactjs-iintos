import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, ContainerWrap } from './styles';
import Students from './components/Students';
import Professors from './components/Professors';
import DeleteModal from './components/Delete';

const Participants = ({ location, isProfessor, isParticipant }) => {
  const [allProfessors, setAllProfessors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState({
    professors: [],
    students: [],
  });
  const [modalParams, setModalParams] = useState({});

  const projectId = useMemo(() => location.pathname.split('/')[2], [
    location.pathname,
  ]);

  const fetchUsers = async () => {
    const response = await api.get(`projects/${projectId}/users`);

    const userList = response.data;

    // userList = userList.map(({}) => {});

    setUsers(userList);
  };

  const fetchAllProfessors = async () => {
    const response = await api.get('professors', {
      params: { projectId },
    });

    setAllProfessors(response.data);
  };

  useState(() => {
    fetchUsers();
    fetchAllProfessors();
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
      onSubmit: () => handleDelete(row.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this participant?',
    });

    setModalOpen('delete');
  };

  const handleCreate = async ({ userId, studentName, studentAge }) => {
    try {
      await api.post('projectUser', {
        userId,
        studentName,
        studentAge,
        projectId,
      });
      setModalOpen(false);
      fetchUsers();
      setAllProfessors(allProfessors.filter(prof => prof.id !== +userId));
      toast.success('Participant add in project with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  return (
    <Container>
      <ContainerWrap>
        <h1>Participants</h1>
        <Professors
          users={users.professors}
          allProfessors={allProfessors}
          handleCreate={handleCreate}
          modalOpen={modalOpen === 'formProfessor'}
          setModalParams={setModalParams}
          modalParams={modalParams}
          setModalOpen={setModalOpen}
          handleDeleteRow={handleDeleteRow}
          isProfessor={isProfessor}
          isParticipant={isParticipant}
        />
      </ContainerWrap>
      <ContainerWrap>
        <Students
          users={users.students}
          handleCreate={handleCreate}
          modalOpen={modalOpen === 'formStudent'}
          setModalParams={setModalParams}
          modalParams={modalParams}
          setModalOpen={setModalOpen}
          handleDeleteRow={handleDeleteRow}
          isProfessor={isProfessor}
          isParticipant={isParticipant}
        />
      </ContainerWrap>

      <DeleteModal
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
};

export default withRouter(Participants);
