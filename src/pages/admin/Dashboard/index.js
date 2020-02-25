import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card1,
  Card3,
  Card4,
  Text,
  Card2,
  Container,
  Events,
  Event,
} from './styles';

const Dashboard = () => {
  return (
    <Container>
      <Card1>
        <Text>Events</Text>

        <Events>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(x => (
            <Event key={x}>
              <p>Joaquim F</p>
              <span>Today, 17:55</span>
              <Link to="calendar">Show in Calendar</Link>
            </Event>
          ))}
        </Events>
      </Card1>

      <Card2>
        <Text>Outputs</Text>
      </Card2>

      <Card3>
        <Text>Projects</Text>
      </Card3>

      <Card4>
        <Text>Activities</Text>
      </Card4>
    </Container>
  );
};

export default Dashboard;
