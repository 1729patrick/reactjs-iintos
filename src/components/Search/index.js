import React from 'react';

import { Container } from './style';

export default function Search({ setDisplay, displayOg, placeholder }) {
  const search = event => {
    const searchQuery = event.target.value.toLowerCase();
    const displayedUser = displayOg?.filter(el => {
      console.log(el);
      let serchVal = '';
      if (el.name !== undefined) {
        serchVal = el.name.toLowerCase();
      } else if (el.title !== undefined) {
        serchVal = el.title.toLowerCase();
      } else if (el.professor !== undefined) {
        serchVal = el.professor.name.toLowerCase();
      } else {
        serchVal = el.studentName.toLowerCase();
      }
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
