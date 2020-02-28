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
        <NavLink to="/about" onClick={onClose}>
          About
        </NavLink>
        <NavLink to="/partners" onClick={onClose}>
          Partners
        </NavLink>
        {/* <NavLink to="/news">News</NavLink> */}

        <NavLink to="/results" onClick={onClose}>
          Results
        </NavLink>

        <NavLink to="/login" onClick={onClose}>
          Login
        </NavLink>
      </div>
    </Container>
  );
}
