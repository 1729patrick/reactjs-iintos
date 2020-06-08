import React, { useMemo, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useUserContext } from '~/context/UserContext';

import { Container } from './styles';

const Footer = ({ links }) => {
  const { user } = useCallback(useUserContext(), []);
  const date = useMemo(() => new Date().getFullYear(), []);
  const isGroupSchool = useMemo(() => {
    return user?.role === 'Coordinator' || user?.role === 'Teacher';
  }, [user]);

  return (
    <Container>
      <div style={{ zIndex: 100 }}>
        <p>
          © {date} - <span>IINTOS -</span> <Link to="/privacy">Privacy</Link>
        </p>

        {links && (
          <div>
            <NavLink to="/iproject">IINTOS Project</NavLink>
            <NavLink to="/iprojects">International Projects</NavLink>
            <NavLink to="/ioffices">International Offices</NavLink>
            <NavLink to="/knowledge">Knowledge base</NavLink>

            {/* <NavLink to="/news">News</NavLink> */}
            {isGroupSchool && <NavLink to="/results">Results</NavLink>}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Footer;
