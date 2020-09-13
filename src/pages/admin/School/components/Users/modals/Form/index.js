import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Checkbox from '~/components/Checkbox';
import Select from '~/components/Select';
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
  initialValues,
  submitText,
  open,
  setOpen,
  modalTitle,
  onSubmit,
  validationSchema,
  schools,
  roles,
}) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  // Form controller
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setFieldValue('schoolId', schools ? schools[0].id : null);
    formik.setFieldValue(
      'active',
      formik.values.active === undefined ? true : formik.values.active
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schools]);

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
              label="Name"
              type="text"
              placeholder="Type the name of this user"
              name="name"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <Input
              label="E-mail"
              type="text"
              placeholder="Email of the user"
              name="email"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Select
              label="Role"
              type="text"
              placeholder="Type the role of this user"
              name="roleId"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
              options={roles}
            />

            <Select
              label="School"
              type="text"
              placeholder="Type the school of this user"
              name="schoolId"
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              options={schools}
              readOnly
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password of the user"
              name="password"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <Checkbox
              label="Active"
              type="text"
              placeholder="Type the country of this user"
              name="active"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
              readOnly
            />
            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
