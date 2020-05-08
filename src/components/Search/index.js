import React from 'react';

import { Container } from './style';

export default function Search({ setDisplay, displayOg, placeholder }) {
  const search = event => {
    const searchQuery = event.target.value.toLowerCase();
    const displayedUser = displayOg?.filter(el => {
      console.log(el);
      const serchVal = el.name.toLowerCase();
      return serchVal.indexOf(searchQuery) !== -1;
    });
    console.log(displayedUser);
    setDisplay(displayedUser);
  };
  return (
    <Container>
      {' '}
      <input type="text" placeholder={placeholder} onChange={search} />
    </Container>
  );
}
