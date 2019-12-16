import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter, Link } from 'react-router-dom';


import { Container, Menu, Content } from './styles';


const Mobility = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Container>
      <Menu>
        <p><Link to="">Look for Partner</Link></p>
        <p><Link to="">Curricule Analyse</Link></p>
        <p><Link to="">Virtual Introduction</Link></p>
        <p><Link to="">Virtual Activiteis</Link></p>
        <p><Link to="">Mobility!</Link></p>
        <p><Link to="">Upload Information</Link></p>
      </Menu> 
      <Content>
      <div>{"eouafjeijh"}</div>

      </Content>
    </Container>
  );
};

export default Mobility;
