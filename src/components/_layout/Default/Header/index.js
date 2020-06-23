import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import { toast } from 'react-toastify';
import Help from './HelpModal';
import api from '~/services/api';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import Menu from '../Menu';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    width: 400,
  },
}));

const Popup = ({ classes, content, anchorEl, handlePopoverClose }) => {
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={content}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography>{content}</Typography>
    </Popover>
  );
};

const description = [
  `Here you will find a set of steps that you should follow with suggested tasks that will help
you create, structure and develop an international office in your school.`,
  `Here you will find a set of steps that you should follow with suggested tasks that will help you create, structure
and develop an international project.`,
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [content, setContent] = useState(null);

  const handlePopoverOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setContent(description[index]);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setContent(null);
  };

  const handleHelpSubmit = async values => {
    try {
      await api.post('helpEmail', values);
      setModalOpen(false);
      toast.success('Email sent with success, thanks for the feedback');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  if (menuOpen) {
    return <Menu onClose={() => setMenuOpen(false)} />;
  }

  return (
    <Container>
      <NavLink to="/">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <Popup
            {...{
              classes,
              anchorEl,
              handlePopoverClose,
              content,
            }}
          ></Popup>

          <NavLink to="/iproject">IINTOS Project</NavLink>
          <NavLink
            to="/ioffices"
            onMouseEnter={e => handlePopoverOpen(e, 0)}
            onMouseLeave={handlePopoverClose}
          >
            International Offices
          </NavLink>
          <NavLink
            to="/iprojects"
            onMouseEnter={e => handlePopoverOpen(e, 1)}
            onMouseLeave={handlePopoverClose}
          >
            International Projects
          </NavLink>

          <NavLink to="/login">Login</NavLink>
          <HelpIcon />
        </div>
      </div>

      <MenuIcon onClick={() => setMenuOpen(true)} />
      <Help
        open={modalOpen === 'Help'}
        setOpen={setModalOpen}
        onSubmit={handleHelpSubmit}
        modalTitle="FeedBack"
      />
    </Container>
  );
};

export default Header;
