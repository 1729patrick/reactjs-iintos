import React, { useState } from 'react';
import { useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import validationSchema from '~/validations/project';
import FormModal from '../Form';
import Input from '~/components/Input';
import { Form } from './styles';
import api from '~/services/api';

export default ({ initialValues }) => {
  const formik = useFormik({ initialValues });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const handleUpdate = async (id, values) => {
    try {
      await api.put(`projects/${id}`, values);
      setModalOpen(false);
      formik.setValues(values);
      toast.success('Project updated with success!');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleEditProject = () => {
    setModalParams({
      initialValues: formik.values,
      validationSchema,
      onSubmit: values => handleUpdate(formik.values.id, values),
      submitText: 'Save',
      modalTitle: 'Project',
    });
    // handleUpdate(row.id, values)
    setModalOpen(true);
  };

  return (
    <Form>
      <span>
        <h2>{formik.values.title}</h2>
        <EditIcon onClick={handleEditProject} />
      </span>
      <Input
        label="Goal"
        type="text"
        placeholder="Type the project goal"
        name="goal"
        readOnly
        values={formik.values}
        background="#fff"
      />

      <Input
        label="Description"
        type="text"
        textarea
        placeholder="Tell more about this project"
        name="description"
        readOnly
        values={formik.values}
        background="#fff"
      />
      <Input
        label="Links"
        type="text"
        placeholder="links"
        name="links"
        readOnly
        values={formik.values}
        background="#fff"
      />
      <Input
        label="Target Audience"
        type="targetAudience"
        placeholder="What's the project target audience"
        name="targetAudience"
        readOnly
        values={formik.values}
        background="#fff"
      />
      <Input
        label="Mobility Type"
        type="type"
        placeholder="What's the mobility type?"
        name="type"
        readOnly
        values={formik.values}
        background="#fff"
      />
      <FormModal open={modalOpen} setOpen={setModalOpen} {...modalParams} />
    </Form>
  );
};
