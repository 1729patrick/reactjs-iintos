import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextareaAutosize } from '@material-ui/core';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { Form, Sessions } from './styles';
import URLs from '../../../../../components/URLs';
import Files from '~/components/Files';
import FileList from '~/components/FileList';

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

export default ({ open, setOpen, row }) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  console.log(row);

  //   createdAt: "2020-07-14T00:24:41.638Z"
  // date: "2020-07-01T00:23:00.000Z"
  // description: "The last transnational project meeting was held between 1 and 10 July 2020, via Zoom, with participants from all partner institutions. The main objective of this meeting was to carry out the joint evaluation of the project and the preparation of the final report.↵↵At the meeting, the partners were able to present / discuss the following topics over the course of 4 days, 1, 6, 7, 8 and 10 of July:↵- budget: expenses incurred / not yet incurred and respective proofs;↵- evaluation of intellectual products 1,2,3 and 4↵- evaluation of mobility and training events↵- evaluation of multiplier events↵- evaluation of dissemination activities,↵- assessment of the impact and sustainability of the project↵- discussion of the 1st draft of the final report"
  // files: Array(1)
  // 0:
  // createdAt: "2020-07-14T00:24:32.755Z"
  // id: 536
  // link: null
  // name: "IINTOS 3rd meeting agenda_July_2020.pdf"
  // path: "0c32ecdb35babf032ef5a248a01e159b.pdf"
  // updatedAt: "2020-07-14T00:24:32.755Z"
  // url: "https://iintoska2.ips.pt/api/files/0c32ecdb35babf032ef5a248a01e159b.pdf"
  // __proto__: Object
  // length: 1
  // __proto__: Array(0)
  // id: 18
  // sessions: Array(0)

  // Form controller
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{row.title}</h2>
        <div id="simple-modal-description">
          <p style={{ marginTop: 15 }}>
            <b>Type:</b> {row.type}
          </p>

          <p style={{ marginTop: 10 }}>
            <b>Description:</b>
            <br />
            <TextareaAutosize
              disabled
              defaultValue={row.description}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
              }}
            />
          </p>

          {!!row.files && (
            <FileList files={row.files} style={{ marginTop: 10 }} />
          )}

          {row.sessions.map((session, index) => (
            <>
              <h3 style={{ marginTop: 10 }}>
                <b>Session {index + 1}</b>
              </h3>
              {session.description.trim().length > 0 && (
                <p style={{ marginTop: 10 }}>
                  <b>Description:</b>
                  <br />

                  <TextareaAutosize
                    disabled
                    defaultValue={session.description}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                    }}
                  />
                </p>
              )}

              {session.links.map(link => (
                <iframe
                  style={{ marginTop: 10 }}
                  key={1}
                  width="300"
                  height="150"
                  src={link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ marginRight: 10, borderRadius: 4, marginBottom: 10 }}
                />
              ))}
              {session.files && (
                <FileList files={session.files} style={{ marginTop: 10 }} />
              )}
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
};
