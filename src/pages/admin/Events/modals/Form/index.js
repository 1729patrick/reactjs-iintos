import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { Form, Sessions } from './styles';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import URLs from '../../../../../components/URLs';
import Files from '~/components/Files';

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

  const handleAdd = field => {
    const values = formik.values[field];

    formik.setFieldValue(field, [
      ...values,
      { files: [''], links: [''], date: new Date().toISOString() },
    ]);
  };

  const handleRemove = (field, index) => {
    const newState = formik.values[field].filter((_, i) => i !== index);

    formik.setFieldValue(field, newState);
  };

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
              placeholder="Type the tile of this event"
              name="title"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />

            <Input
              label="Description"
              textarea
              type="text"
              placeholder="Description of the event"
              name="description"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            <Select
              label="Type"
              type="text"
              placeholder="Type of the event"
              name="type"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
              options={[
                { id: 'Multiplier Events', name: 'Multiplier Events' },
                {
                  id: 'Short-term joint staff training events',
                  name: 'Short-term joint staff training events',
                },
                {
                  id: 'Transnational Meetings',
                  name: 'Transnational Meetings',
                },
                {
                  id: 'Short-term exchanges of groups of pupils',
                  name: 'Short-term exchanges of groups of pupils',
                },
              ]}
            />
            {/*
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                name="date"
                label="Date"
                value={formik?.values?.date}
                onChange={event => formik.setFieldValue('date', event)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider> */}

            <Files formik={formik} />

            <Sessions>
              <h3>Sessions</h3>
              {formik.values.sessions.map((value, index) => (
                <div key={String(index)}>
                  <div>
                    <Input
                      label="Title"
                      type="text"
                      placeholder="Type the tile of this section"
                      name={`sessions[${index}].title`}
                      error={formik.errors?.sessions?.[index]?.title}
                      value={formik.values.sessions?.[index]?.title}
                      onChange={formik.handleChange}
                      submitted={formik.submitCount}
                    />

                    <Input
                      label="Description"
                      textarea
                      type="text"
                      placeholder="Description of the section"
                      name={`sessions[${index}].description`}
                      onChange={formik.handleChange}
                      error={formik.errors?.sessions?.[index]?.description}
                      value={formik.values.sessions?.[index]?.description}
                      submitted={formik.submitCount}
                      style={{ marginTop: 10 }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        disableToolbar
                        variant="inline"
                        format="yyyy-MM-dd"
                        margin="normal"
                        id="date-picker-inline"
                        name={`sessions[${index}].date`}
                        label="Date"
                        value={formik.values.sessions?.[index]?.date}
                        onChange={event =>
                          formik.setFieldValue(`sessions[${index}].date`, event)
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>

                    <Files
                      formik={formik}
                      path={`sessions[${index}].files`}
                      values={formik.values.sessions[index]?.files}
                    />
                    <URLs
                      formik={formik}
                      values={formik.values.sessions[index]?.links}
                      name={`sessions[${index}]`}
                    />
                  </div>
                  <DeleteIcon
                    style={{ color: '#cb1010', cursor: 'pointer' }}
                    onClick={() => handleRemove('sessions', index)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleAdd('sessions')}>
                + Add Session
              </button>
            </Sessions>

            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
