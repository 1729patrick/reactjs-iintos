import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import Select from '~/components/Select';
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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
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
              label="Goal"
              type="text"
              placeholder="Type the project goal"
              name="goal"
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
            <Input
              label="Links"
              type="text"
              placeholder="links"
              name="links"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Input
              label="Target Audience"
              type="targetAudience"
              placeholder="What's the project target audience"
              name="targetAudience"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Select
              label="Mobility Type"
              type="type"
              placeholder="What's the mobility type?"
              name="type"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
              options={[
                { id: 'Virtual', name: 'Virtual' },
                { id: 'In Presence', name: 'In Presence' },
              ]}
            />

            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
