import React, { useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

const Footer = ({ links }) => {
  const date = useMemo(() => new Date().getFullYear(), []);

  return (
    <Container>
      <div style={{ zIndex: 100 }}>
        <p>
          © {date} -{' '}
          <span>
            <Link to="/privacy">Privacy</Link> - IINTOS | Development by{' '}
            <a
              style={{ marginLeft: 0 }}
              href="https://www.linkedin.com/in/nuno-pina-gon%C3%A7alves-143931/"
              target="_blank"
            >
              Nuno Pina
            </a>{' '}
            and{' '}
            <a
              style={{ marginLeft: 0 }}
              href="https://www.linkedin.com/in/patrickbattisti/"
              target="_blank"
            >
              Patrick Forsthofer
            </a>
          </span>
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
