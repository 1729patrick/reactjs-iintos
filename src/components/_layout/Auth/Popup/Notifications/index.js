import React from 'react';
import { Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import { NavLink } from 'react-router-dom';

import { Icon, Container, NameDiv } from './styles';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Badge
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        color="primary"
        badgeContent={20}
      >
        <NotificationsIcon style={{ color: '#555', marginLeft: 0 }} />
      </Badge>

      <Popover
        onClick={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: 7 }}
      >
        <Container>
          <h2>Notifications</h2>
          <NavLink to="/profile">Profile</NavLink>
        </Container>
      </Popover>
    </div>
  );
};

export default Notifications;
