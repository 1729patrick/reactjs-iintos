import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Button from '~/components/Button';
import Input from '~/components/Input';

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

export default function Delete({
  open,
  setOpen,
  modalTitle,
  active,
  onSubmit,
}) {
  const classes = useStyles();
  const [reason, setReason] = useState();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  if (!open) {
    return null;
  }

  // function when the modal closes
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{modalTitle}</h2>
          <div id="simple-modal-description" style={{ paddingTop: '20px' }}>
            {!active && (
              <Input
                textarea
                label="Reason"
                type="text"
                placeholder="Reason to refuse request"
                name="reason"
                onChange={e => setReason(e.target.value)}
              />
            )}
            <Button
              title="Yes"
              type="submit"
              onClick={() => onSubmit(reason)}
              width="100%"
              marginTop="30px"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
