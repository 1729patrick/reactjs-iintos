import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Button from '~/components/Button';
import api from '~/services/api';
import { Form } from '../components/CreateProject/styles';
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

export default function DeleteProject({ onCreate, id }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  // function when the modal get's created
  const handleOpen = () => {
    setOpen(true);
  };

  // function when the modal closes
  const handleClose = () => {
    setOpen(false);
  };

  // api call to delete
  const onSubmit = async () => {
    console.log('SUBMETEU');
    try {
      await api.delete(`projects/${id}`);
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
    handleClose();
    onCreate();
    toast.success('Project deleted!');
  };

  // Form controller
  const formik = useFormik({
    onSubmit,
  });

  return (
    <div>
      <Button title="Delete" type="button" onClick={handleOpen} />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Are you sure you want to delete this project?
          </h2>
          <div id="simple-modal-description">
            <Form onSubmit={formik.handleSubmit}>
              <Button title="Yes" type="submit" />
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
