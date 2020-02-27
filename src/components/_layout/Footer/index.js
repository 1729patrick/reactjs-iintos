import React, { useMemo, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useUserContext } from '~/context/UserContext';

import { Container } from './styles';

const Footer = ({ links }) => {
  const { user } = useCallback(useUserContext(), []);
  const date = useMemo(() => new Date().getFullYear(), []);
  const isIintosAdmin = useMemo(() => {
    return user?.role === 'IINTOS-Admin';
  }, [user]);

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
            {isIintosAdmin && <NavLink to="/results">Results</NavLink>}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Footer;
