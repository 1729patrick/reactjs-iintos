import React, { useCallback, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import validationSchema from '~/validations/updateUser';
import FormModal from './components/Form';

export default function Profile() {
  const { user, setUser, token, school } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  // api call to post
  const handleUpdate = async values => {
    try {
      const result = await api.put(`updateUser`, values);
      console.log('------------');
      console.log(result.data);

      setUser({ token, school, user: result.data });
      setModalOpen(false);
      toast.success('User updated with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };
  const handleDetailRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: values => handleUpdate(values),
      submitText: 'Save',
      modalTitle: 'User',
    });

    setModalOpen('form');
  };
  return (
    <div>
      <ul>
        <EditIcon onClick={() => handleDetailRow(user)} />
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        {user.school !== undefined && <li>School: {user.school}</li>}
        <li>Role: {user.role.name}</li>
      </ul>
      <FormModal
        open={modalOpen === 'form'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </div>
  );
}
