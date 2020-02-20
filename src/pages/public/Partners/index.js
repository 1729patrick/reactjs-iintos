import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { Container, Menu, Content } from './style';

import IPS from './components/IPS';


export default withRouter(({ location }) => {
  const Children = () => {
    const route = location.pathname.replace('/partners', '');
    if (route === '/IPS') {
      return <IPS />;
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
        </div>
      </Menu>
      <Content>
        <Children />
      </Content>
    </Container>
  );
});
