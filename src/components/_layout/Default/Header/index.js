import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import { toast } from 'react-toastify';
import Help from './HelpModal';
import api from '~/services/api';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import Menu from '../Menu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleHelpSubmit = async values => {
    try {
      await api.post('helpEmail', values);
      setModalOpen(false);
      toast.success('Email sent with success, thanks for the feedback');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };
  // Function that opens the Help modal
  const onClickHelp = () => {
    setModalOpen('Help');
  };

  if (menuOpen) {
    return <Menu onClose={() => setMenuOpen(false)} />;
  }

  return (
    <Container>
      <NavLink to="/">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partners">Partners</NavLink>
          <NavLink to="/news">News</NavLink>

          <NavLink to="/results">Results</NavLink>
          <NavLink to="/knowledge">Knowledge base</NavLink>

          <NavLink to="/stem">STEM</NavLink>

          <NavLink to="/login">Login</NavLink>
          <HelpIcon />
        </div>
      </div>

      <MenuIcon onClick={() => setMenuOpen(true)} />
      <Help
        open={modalOpen === 'Help'}
        setOpen={setModalOpen}
        onSubmit={handleHelpSubmit}
        modalTitle="FeedBack"
      />
    </Container>
  );
};

export default Header;
