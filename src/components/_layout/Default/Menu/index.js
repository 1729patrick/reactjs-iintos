import React from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import { Container } from './styles';

export default function Menu({ onClose }) {
  return (
    <Container>
      <header>
        <CloseIcon onClick={onClose} />
      </header>
      <div>
        <NavLink to="/iproject" onClick={onClose}>
          IINTOS Project
        </NavLink>
        <NavLink to="/iprojects" onClick={onClose}>
          International Projects
        </NavLink>
        {/* <NavLink to="/news">News</NavLink> */}

        <NavLink to="/ioffices" onClick={onClose}>
          International Offices
        </NavLink>

        <NavLink to="/login" onClick={onClose}>
          Login
        </NavLink>
      </div>
    </Container>
  );
}
