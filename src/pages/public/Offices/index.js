import React, { useMemo, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

import IPS from './components/IPS';
import Olomouc from './components/Olomouc';
import Saramago from './components/Saramago';
import Vallauri from './components/Vallauri';

export default withRouter(({ location, history }) => {
  const route = useMemo(() => location.pathname.replace('/partners', ''), [
    location,
  ]);

  useEffect(() => {
    if (!route) {
      history.push('/partners/IPS');
    }
  }, [route, history]);

  const Children = () => {
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
            Istituto “Giancarlo Vallauri” Fossano
          </NavLink>
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
