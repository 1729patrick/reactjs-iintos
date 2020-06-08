import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

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
  open,
  setOpen,
  modalTitle,
  validationSchema,
  onSubmit,
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
  initialValues.isPrivacy = true;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
      disableBackdropClick
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{modalTitle}</h2>
        <div id="simple-modal-description">
          <br />
          Do you accept the terms of privacy?
          <p>
            The new General Data Protection Regulation (GDPR) guarantees that
            your personal data that may be processed by the Polytechnic
            Institute of Setúbal as coordinator of the ERAMUS+ KA2 project
            Implementation of International Offices in Schools are:
            <br />
            <br />
            <p>
              • Exclusively used for tasks related to our activities, which aim
              to respond to requests from the competent entities, what we do and
              request their involvement in initiatives, studies and
              investigations developed by the Polytechnic Institute of Setúbal,
              Palacký University Olomouc, Cluster of Schools José Saramago and
              Istituto di Istruzione Superiore “Giancarlo Vallauri” Fossano;
            </p>
            <br />
            <p>
              • Obtained through the data you provided to us when registering on
              the IINTOS platform: Name and email address, and in the case of
              School Coordinator: School name, phone, country, city and postal
              code.
            </p>
            <br />
            <p>
              • Limited to the information we need to perform the tasks referred
              to above;
            </p>
            <br />
            <p>• Updated, for which we count on your collaboration;</p>
            <br />
            <p>
              • Kept in processing until you inform us of your non-interest in
              being contacted again, being able to exercise your rights of
              access, rectification, deletion, opposition, limitation and
              portability, requesting it, in writing, by email to
              iintosdev@gmail.com, who must prove his/her identity and specify
              the right or rights he/she intends to exercise;
            </p>
            <br />
            <p>
              • Stored in the computer systems of the Polytechnic Institute of
              Setúbal. This data will not be transmitted to any other entity,
              other than to comply with legal obligations.
            </p>
            <br />
            <p>
              Based on these principles, we ask that you inform us of your
              express consent to them.
            </p>
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <Button title="Yes" type="submit" />
          </Form>
          <br />
        </div>
      </div>
    </Modal>
  );
};
