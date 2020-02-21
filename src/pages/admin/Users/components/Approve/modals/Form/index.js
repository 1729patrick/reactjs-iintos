import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({ initialValues, open, setOpen, modalTitle }) => {
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
  const formik = useFormik({ initialValues });

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
              values={formik.values}
            />

            <Input
              label="E-mail"
              type="text"
              placeholder="Email of the user"
              name="email"
              values={formik.values}
            />
            <Select
              label="School"
              type="text"
              placeholder="Type the school of this user"
              name="schoolId"
              values={formik.values}
            />
            <Select
              label="Role"
              type="text"
              placeholder="Type the role of this user"
              name="roleId"
              values={formik.values}
            />

            <Checkbox
              label="Active"
              type="text"
              placeholder="Type the country of this user"
              name="active"
              values={formik.values}
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
