import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import Button1 from '~/components/Button';
import { Form, Circle } from './styles';
import { useMemo } from 'react';
import { TextareaAutosize } from '@material-ui/core';

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
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    maxHeight: '85%',
    overflowY: 'auto',
    padding: 40,
  },
  popover: {
    pointerEvents: 'none',
    width: 500,
  },
}));

export default ({
  initialValues = {},
  submitText,
  open,
  setOpen,
  modalTitle,
  onSubmit,
  validationSchema,
  users,
  handleToggle,
  steps,
}) => {
  if (!open) {
    return null;
  }

  const [popupOpen, setPopupOpen] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setPopupOpen(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopupOpen(null);
  };

  const [steps_, setSteps_] = useState([]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  // Form controller
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    const width = window.innerWidth * 0.65 - 150;
    const height = 450 - 150;

    const lefts = [];

    let sum = 0;
    while (true) {
      if (sum < width) {
        lefts.push(sum);
        sum += 150;
        continue;
      }

      break;
    }

    const tops = [];

    let sumT = 0;
    while (true) {
      if (sumT <= height) {
        tops.push(sumT);
        sumT += 150;
        continue;
      }

      break;
    }

    let sorted = {};
    let steps_a = Object.keys(steps).map((key, index) => {
      const left = lefts[index % lefts.length];
      let topSorted = tops[(Math.random() * tops.length).toFixed(0)];

      while (true) {
        if (topSorted !== undefined && !sorted[`${topSorted}${left}`]) {
          sorted[`${topSorted}${left}`] = true;
          break;
        } else {
          topSorted = tops[(Math.random() * tops.length).toFixed(0)];
        }
      }

      return {
        ...steps[key],
        top: topSorted,
        left,
      };
    });

    return setSteps_(steps_a);
  }, []);

  const onSelect = index => {
    setSteps_(
      steps_.map((step, i) =>
        i === index ? { ...step, checked: !step.checked } : step
      )
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <h2 id="simple-modal-title">
            Steps and tasks to follow in the elaboration of an international
            project
          </h2>
          <Button1 title={submitText} onClick={() => onSubmit(steps_)} />
        </div>
        <div id="simple-modal-description">
          <span>
            Here you can find proposals for steps and tasks to build your
            international project. There is no single order. In each circle you
            can find the tasks we propose, and others can be created according
            to each project, country, characteristics of the financing program.
          </span>

          <h3 style={{ marginTop: 15 }}>
            You can select the activities for your project
          </h3>
          <div
            style={{
              height: 450,
              marginTop: 25,
              position: 'relative',
            }}
          >
            {steps_.map(({ title, top, left, description, checked }, index) => (
              <>
                <Circle
                  onMouseEnter={e => handlePopoverOpen(e, index)}
                  onMouseLeave={handlePopoverClose}
                  style={{
                    top,
                    left,
                    background: checked ? '#3F51B5' : '#3f50b5',
                    borderColor: checked ? 'black' : null,
                  }}
                  onClick={() => onSelect(index)}
                >
                  {checked ? `[SELECTED] ${title}` : title}
                </Circle>

                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={popupOpen === index}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>
                    <TextareaAutosize
                      defaultValue={description}
                      style={{
                        width: '100%',
                        border: 'none',
                        color: '#444',
                        background: '#fff',
                      }}
                    ></TextareaAutosize>
                  </Typography>
                </Popover>
              </>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
