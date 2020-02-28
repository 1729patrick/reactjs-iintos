import React from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import { Container } from './styles';

export default function Menu({ isGroupAdmin, isGroupSchool, logout, onClose }) {
  return (
    <Container>
      <header>
        <CloseIcon onClick={onClose} />
      </header>
      <div>
        <NavLink to="/projects" onClick={onClose}>
          Projects
        </NavLink>
        {isGroupAdmin && (
          <NavLink to="/outputs" onClick={onClose}>
            Outputs
          </NavLink>
        )}
        {!isGroupSchool && (
          <NavLink to="/results" onClick={onClose}>
            Results
          </NavLink>
        )}
        <NavLink to="/calendar" onClick={onClose}>
          Calendar
        </NavLink>
        {isGroupAdmin && (
          <NavLink to="/users" onClick={onClose}>
            Users
          </NavLink>
        )}
        {isGroupSchool && (
          <NavLink to="/school" onClick={onClose}>
            School
          </NavLink>
        )}
        <NavLink to="/profile" onClick={onClose}>
          Profile
        </NavLink>
        <NavLink to="/login" onClick={logout}>
          Logout
        </NavLink>
      </div>
    </Container>
  );
}
