import React, { useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

const Footer = ({ links }) => {
  // const date = useMemo(() => new Date().getFullYear(), []);

  return (
    <Container>
      <div style={{ zIndex: 100 }}>
        <div>
          <img
            src={require('~/assets/images/erasmus.png')}
            style={{ width: 200 }}
          />
        </div>

        <div style={{ flexDirection: 'column' }}>
          <p>
            Development by{' '}
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
          </p>
          <p>AGREEMENT NUMBER 2017-1-PT01-KA201-035947 </p>
        </div>

        <div>
          <span>
            {links && (
              <>
                <Link to="/privacy">Privacy</Link>
                <NavLink to="/iproject">IINTOS Project</NavLink>
                <NavLink to="/ioffices">International Offices</NavLink>
                <NavLink to="/iprojects">International Projects</NavLink>

                {/* <NavLink to="/knowledge">Knowledge base</NavLink> */}
              </>
            )}
            <NavLink to="/contacts">Contacts</NavLink>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
