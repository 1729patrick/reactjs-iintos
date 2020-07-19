import React, { useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

const Footer = ({ links }) => {
  const date = useMemo(() => new Date().getFullYear(), []);

  return (
    <Container>
      <div style={{ zIndex: 100 }}>
        <p>
          © {date} - <span>IINTOS -</span> <Link to="/privacy">Privacy</Link>
        </p>

        {links && (
          <div>
            <NavLink to="/iproject">IINTOS Project</NavLink>
            <NavLink to="/ioffices">International Offices</NavLink>
            <NavLink to="/iprojects">International Projects</NavLink>

            <NavLink to="/knowledge">Knowledge base</NavLink>
          </div>
        )}
        <NavLink to="/contacts">Contacts</NavLink>
      </div>
    </Container>
  );
};

export default Footer;
