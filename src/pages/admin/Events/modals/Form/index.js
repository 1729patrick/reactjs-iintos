import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import { Form, Sections } from './styles';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

    formik.setFieldValue(field, [...values, { files: [''] }]);
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
              options={[]}
            />

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
            </MuiPickersUtilsProvider>

            <Files formik={formik} />

            <Sections>
              <h3>Sections</h3>
              {formik.values.sections.map((value, index) => (
                <div key={String(index)}>
                  <div>
                    <Input
                      label="Title"
                      type="text"
                      placeholder="Type the tile of this section"
                      name={`sections[${index}].title`}
                      error={formik.errors?.sections?.[index]?.title}
                      value={formik.values.sections?.[index]?.title}
                      onChange={formik.handleChange}
                      submitted={formik.submitCount}
                    />

                    <Input
                      label="Description"
                      textarea
                      type="text"
                      placeholder="Description of the section"
                      name={`sections[${index}].description`}
                      onChange={formik.handleChange}
                      error={formik.errors?.sections?.[index]?.description}
                      value={formik.values.sections?.[index]?.description}
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
                        name={`sections[${index}].date`}
                        label="Date"
                        value={formik.values.sections?.[index]?.date}
                        onChange={event =>
                          formik.setFieldValue(`sections[${index}].date`, event)
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>

                    <Files
                      formik={formik}
                      path={`sections[${index}].files`}
                      values={formik.values.sections[index]?.files}
                    />
                  </div>
                  <DeleteIcon
                    style={{ color: '#cb1010', cursor: 'pointer' }}
                    onClick={() => handleRemove('sections', index)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => handleAdd('sections')}>
                + Add Section
              </button>
            </Sections>

            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
