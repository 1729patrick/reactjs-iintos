import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { Form } from './styles';
import api from '~/services/api';
import validationSchema from '~/validations/project';

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

export default function CreateProject({ onCreate }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // api call to post
  const onSubmit = async values => {
    try {
      await api.post('projects', values);
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
    handleClose();
    onCreate();
    toast.success('Project created with success!');
  };

  // Form controller
  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: {
      goal: '',
      description: '',
      links: '',
      targetAudience: '',
      type: '',
    },
  });

  return (
    <div>
      <Button title="Create Project" type="button" onClick={handleOpen} />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create a new Project</h2>
          <div id="simple-modal-description">
            <Form onSubmit={formik.handleSubmit}>
              <Input
                label="Goal"
                type="text"
                placeholder="Type the goals of this project"
                name="goal"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="Description"
                type="text"
                placeholder="Description of the project"
                name="description"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="Links"
                type="text"
                placeholder="Type the goals of this project"
                name="links"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="Target Audience"
                type="text"
                placeholder="Add the range of the audience"
                name="targetAudience"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="Type"
                type="text"
                placeholder="Tells us the type of project"
                name="type"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Button title="Submit" type="submit" />
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
