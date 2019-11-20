import React from 'react';

import {
  Card1,
  SubCard2,
  CardContainer2,
  Card3,
  Card4,
  Text,
  Card2,
  Container,
  CardText2,
} from './styles';

const Dashboard = () => {
  return (
    <Container>
      <Card1>
        <Text>Card 1</Text>
      </Card1>

      <CardContainer2>
        <CardText2>Card 2</CardText2>

        <Card2>
          <SubCard2 />
          <SubCard2 />
          <SubCard2 />
          <SubCard2 />
          <SubCard2 />
          <SubCard2 />
        </Card2>
      </CardContainer2>

      <Card3>
        <Text>Card 3</Text>
      </Card3>

      <Card4>
        <Text>Card 4</Text>
      </Card4>
    </Container>
  );
};

export default Dashboard;
