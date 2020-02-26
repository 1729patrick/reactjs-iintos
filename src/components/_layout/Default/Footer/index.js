import React, { useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

const Footer = ({ links }) => {
  const date = useMemo(() => new Date().getFullYear(), []);
  return (
    <Container>
      <div>
        <p>
          © {date} - IINTOS - <Link to="/">Privacy</Link>
        </p>

        {links && (
          <div>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/partners">Partners</NavLink>
            {/* <NavLink to="/news">News</NavLink> */}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Footer;
