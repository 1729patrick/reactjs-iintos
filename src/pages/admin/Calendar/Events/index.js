import React from 'react';

import { Container, Item, Itens } from './styles';

export const Events = () => {
  return (
    <Container>
      <p>Events</p>

      <Itens>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(x => (
          <Item key={x}>
            <p>Joaquim F</p>
            <span>Today, 17:55</span>
          </Item>
        ))}
      </Itens>
    </Container>
  );
};

export default Events;
