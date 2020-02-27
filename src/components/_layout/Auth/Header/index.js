import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';

import Popup from '../Popup';

const Header = () => {
  const { user, setUser } = useUserContext();

  const logout = () => {
    localStorage.clear();
    setUser({
      user: null,
      school: null,
      token: null,
    });

    api.defaults.headers.authorization = null;
    apiCalendar.defaults.headers.userID = null;
  };

  const isGroupAdmin = useMemo(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const isGroupSchool = useMemo(() => {
    return user?.role === 'Coordinator' || user?.role === 'Professor';
  }, [user]);

  return (
    <Container>
      <NavLink to="/dashboard">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/projects">Projects</NavLink>
          {isGroupAdmin && <NavLink to="/outputs">Outputs</NavLink>}
          {!isGroupSchool && <NavLink to="/results">Results</NavLink>}
          <NavLink to="/calendar">Calendar</NavLink>
          {isGroupAdmin && <NavLink to="/users">Users</NavLink>}
          {isGroupSchool && <NavLink to="/school">School</NavLink>}
          <Popup logout={logout} user={user} />
        </div>
      </div>
    </Container>
  );
};

export default Header;
