import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    maxHeight: '85%',
    overflowY: 'auto',
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function FileList({ files = [], links = [] }) {
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  if (!files.length && !links.length) {
    return null;
  }

  return (
    <>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{links?.length ? 'Links' : 'Files'}</h2>
          <div id="simple-modal-description">
            <div style={{ marginTop: '15px' }}>
              {files.map(({ name, url }) => (
                <a
                  key={url}
                  style={{
                    display: 'block',
                    marginBottom: '7px',
                    color: 'blue',
                  }}
                  href={url}
                  target="__blank"
                >
                  {name}
                </a>
              ))}
              {links.map(({ link }) => (
                <a
                  key={link}
                  style={{
                    display: 'block',
                    marginBottom: '7px',
                    color: 'blue',
                  }}
                  href={link}
                  target="__blank"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <button onClick={handleOpen} style={{ color: 'blue' }}>
        {links?.length ? 'Show Links' : 'Show Files'}
      </button>
    </>
  );
}
