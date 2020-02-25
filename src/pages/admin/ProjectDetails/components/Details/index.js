import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';

import { toast } from 'react-toastify';
import validationSchema from '~/validations/project';
import FormModal from './Form';
import Input from '~/components/Input';
import { Form } from './styles';
import api from '~/services/api';

export default ({ initialValues, isProfessor, isParticipant }) => {
  const formik = useFormik({ initialValues });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const handleUpdate = async (id, values) => {
    try {
      const response = await api.put(`projects/${id}`, values);
      setModalOpen(false);
      formik.setValues({
        ...response.data,
        ageRange: `${response.data.ageRangeStart} - ${response.data.ageRangeEnd}`,
      });
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

  const formattedLimitDate = useMemo(() => {
    const { endDate } = formik.values;
    if (endDate) return { endDate: format(new Date(endDate), 'yyyy-MM-dd') };

    return { endDate: '' };
  }, [formik.values]);

  return (
    <Form>
      <span>
        <h2>{formik.values.title}</h2>
        {isProfessor !== undefined && !isProfessor && isParticipant && (
          <EditIcon onClick={handleEditProject} />
        )}
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
        label="Age Range"
        type="ageRange"
        placeholder="What's the project target audience"
        name="ageRange"
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
      <Input
        label="Limit Date"
        type="type"
        placeholder="What's the limit date"
        name="endDate"
        readOnly
        values={formattedLimitDate}
        background="#fff"
      />

      <FormModal open={modalOpen} setOpen={setModalOpen} {...modalParams} />
    </Form>
  );
};
