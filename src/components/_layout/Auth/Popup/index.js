import React from 'react';
import { NavLink } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import {
  CloudDownload,
  ExitToApp,
  Person,
  Assignment,
} from '@material-ui/icons';

import { Icon, Container, NameDiv } from './styles';
import Notifications from './Notifications';

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
    <div
      style={{
        paddingLeft: 20,
        marginLeft: 20,
        borderLeft: '1px solid #eee',
      }}
    >
      <div
        style={{
          paddingRight: 20,
          marginRight: 20,
          borderRight: '1px solid #eee',
        }}
      >
        <Notifications />
      </div>

      <NameDiv>
        {user.name} <br />
        {user.role}
      </NameDiv>
      <Icon onClick={handleClick}>
        <img src={user.avatar} alt="" />
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Icon>

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
          <NavLink to="/profile">
            <Person />
            Profile
          </NavLink>
          {user.role === 'Admin' && (
            <NavLink to="/log">
              <Assignment />
              Log
            </NavLink>
          )}
          {user.role === 'Admin' && (
            <NavLink to="/downloads">
              <CloudDownload />
              Downloads
            </NavLink>
          )}

          <NavLink to="/login" onClick={logout}>
            <ExitToApp />
            Logout
          </NavLink>
        </Container>
      </Popover>
    </div>
  );
}
