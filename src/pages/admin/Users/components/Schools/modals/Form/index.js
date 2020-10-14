import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import Checkbox from '~/components/Checkbox';
import Button from '~/components/Button';
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
  initialValues,
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
  const [showContact, setShowContact] = useState(false);
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
              placeholder="Type the name of this school"
              name="name"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <Input
              label="Phone"
              type="number"
              placeholder="Phone of the school"
              name="phone"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Input
              label="Country"
              type="text"
              placeholder="Type the country of this school"
              name="country"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Input
              label="City"
              type="text"
              placeholder="Type the city of this school"
              name="city"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Input
              label="Postal Code"
              type="text"
              placeholder="Type the postal code of this school"
              name="postalCode"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            {formik.values.showContact && (
              <Input
                label="Contact Email"
                type="text"
                name="contactEmail"
                placeholder="Type your contact email for your International Office"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
            )}

            <Checkbox
              label="Add email contact for your International Office to be available on the free access"
              name="showContact"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
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
            />

            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
