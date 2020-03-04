import React from 'react';
import { NavLink } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { Icon, Container } from './styles';

export default function SimplePopover({ logout, user }) {
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
      <Icon onClick={handleClick}>
        <img src={user.avatar} alt="" />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Icon>
      {user.name} <br />
      {user.role}
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
      >
        <Container>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login" onClick={logout}>
            Logout
          </NavLink>
        </Container>
      </Popover>
    </div>
  );
}
