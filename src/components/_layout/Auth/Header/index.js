import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import { toast } from 'react-toastify';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';
import Menu from '../Menu';
import Popup from '../Popup';
import Help from './HelpModal';

const Header = () => {
  const { user, setUser } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Function that opens the Help modal
  const onClickHelp = () => {
    setModalOpen('Help');
  };

  const handleHelpSubmit = async values => {
    try {
      await api.post('helpEmail', values);
      setModalOpen(false);
      toast.success('Email sent with success, thanks for the feedback');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };
  return (
    <>
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
            <NavLink to="/news">News</NavLink>
            {isGroupAdmin && <NavLink to="/users">Users</NavLink>}
            {isGroupSchool && <NavLink to="/school">School</NavLink>}
            <Popup logout={logout} user={user} />
            <HelpIcon fontSize="large" onClick={() => onClickHelp()} />
          </div>
        </div>

        <MenuIcon onClick={() => setMenuOpen(true)} />
      </Container>
      {menuOpen && (
        <Menu
          onClose={() => setMenuOpen(false)}
          isGroupSchool={isGroupSchool}
          isGroupAdmin={isGroupAdmin}
          logout={logout}
        />
      )}
      <Help
        open={modalOpen === 'Help'}
        setOpen={setModalOpen}
        initialValues={user}
        onSubmit={handleHelpSubmit}
        modalTitle="FeedBack"
      />
    </>
  );
};

export default Header;
