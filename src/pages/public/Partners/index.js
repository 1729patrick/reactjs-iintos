import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

import IPS from './components/IPS';
import Olomouc from './components/Olomouc';
import Saramago from './components/Saramago';
import Vallauri from './components/Vallauri';

export default withRouter(({ location }) => {
  const Children = () => {
    const route = location.pathname.replace('/partners', '');
    if (route === '/IPS') {
      return <IPS />;
    }

    if (route === '/Olomouc') {
      return <Olomouc />;
    }
    if (route === '/Saramago') {
      return <Saramago />;
    }
    if (route === '/Vallauri') {
      return <Vallauri />;
    }

    // By default, the content from the IPS will appear
    return <IPS />;
  };
  return (
    <Container>
      <Menu>
        <div>
          <NavLink to="/partners/IPS">Polytechnic Institute of Setúbal</NavLink>
          <NavLink to="/partners/Olomouc">Palacký University Olomouc</NavLink>
          <NavLink to="/partners/Saramago">
            Group of Schools José Saramago
          </NavLink>
          <NavLink to="/partners/Vallauri">
            Istuzione Superiore "G.Vallauri"
          </NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});