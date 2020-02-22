import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from '~/components/Button';
import Select from '~/components/Select';
import Input from '~/components/Input';
import { Form } from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    maxHeight: '85%',
    overflowY: 'auto',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({
  initialValues = { students: [undefined], professors: [undefined], title: '' },
  submitText,
  open,
  setOpen,
  modalTitle,
  onSubmit,
  validationSchema,
}) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  // Form controller
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  const handleAdd = field => {
    const values = formik.values[field];
    formik.setFieldValue(field, [...values, {}]);
  };

  const handleRemove = (field, index) => {
    const newState = formik.values[field].filter((_, i) => i !== index);

    formik.setFieldValue(field, newState);
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{modalTitle}</h2>
        <div id="simple-modal-description">
          <Form onSubmit={formik.handleSubmit}>
            <Input
              label="Title"
              type="text"
              placeholder="Type the project title"
              name="title"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <Input
              label="Description"
              type="text"
              textarea
              placeholder="Tell more about this project"
              name="description"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <h3>Participants</h3>
            <span>
              {formik.values.professors.map((_, index) => (
                <div key={String(index)}>
                  <Select
                    label={`Professor ${index + 1}`}
                    textarea
                    placeholder="Add professor to activity"
                    name="professor"
                    onChange={value =>
                      formik.setFieldValue(
                        `professors[${index}]`,
                        value.target.value
                      )
                    }
                    values={{ professor: formik.values.professors[index] }}
                    errors={formik.errors}
                    touched={formik.touched}
                    submitted={formik.submitCount}
                    options={[{ id: 1, name: 'patrick' }]}
                  />
                  <DeleteIcon
                    style={{ color: '#cb1010', cursor: 'pointer' }}
                    onClick={() => handleRemove('professors', index)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleAdd('professors')}>
                + Add Professor
              </button>
            </span>

            <span>
              {formik.values.students.map((_, index) => (
                <div key={String(index)}>
                  <Select
                    label={`Student ${index + 1}`}
                    textarea
                    placeholder="Add student to activity"
                    name="student"
                    onChange={value =>
                      formik.setFieldValue(
                        `students[${index}]`,
                        value.target.value
                      )
                    }
                    values={{ student: formik.values.students[index] }}
                    errors={formik.errors}
                    touched={formik.touched}
                    submitted={formik.submitCount}
                    options={[{ id: 1, name: 'patrick' }]}
                  />
                  <DeleteIcon
                    style={{ color: '#cb1010', cursor: 'pointer' }}
                    onClick={() => handleRemove('students', index)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleAdd('students')}>
                + Add Student
              </button>
            </span>
            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
