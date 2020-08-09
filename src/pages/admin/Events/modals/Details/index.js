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

  const mountEvent11 = id => {
    if (id !== 11) return;

    return (
      <>
        <div
          style={{
            justifyContent: 'flex-start',
            margin: '15px 0',
            fontSize: 17,
            textTransform: 'uppercase',
          }}
        >
          News about this event
        </div>
        <div>
          <a
            href="https://www.si.ips.pt/ips_si/noticias_geral.ver_noticia?P_NR=7796"
            target="_blank"
          >
            Conferência IINTOS | Projeto para agilizar mobilidade internacional
            nas escolas
          </a>
          <br />
          <br />
          <a
            href="https://issuu.com/ipsetubal/docs/jornalmovete_mai_jun2020"
            target="_blank"
          >
            Jornal MOVEte | nº14 | maio/junho 2020
          </a>
        </div>

        <iframe
          key={1}
          width="300"
          height="150"
          src="https://www.youtube.com/embed/DnOvxDtYpn0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
        />
      </>
    );
  };

  const mountEvent10 = id => {
    if (id !== 10) return;

    return (
      <>
        <iframe
          key={1}
          width="300"
          height="150"
          src="https://www.youtube.com/embed/7P3_vypoEuQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginTop: 25, borderRadius: 4, marginBottom: 10 }}
        />
      </>
    );
  };

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

          {!!row.files?.length && (
            <FileList files={row.files} style={{ marginTop: 10 }} />
          )}

          {mountEvent11(row.id)}
          {mountEvent10(row.id)}

          {row.sessions.map((session, index) => (
            <>
              <h3 style={{ marginTop: 10, marginBottom: 10 }}>
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
              {session.files?.length && (
                <FileList files={session.files} style={{ marginTop: 10 }} />
              )}
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
};
