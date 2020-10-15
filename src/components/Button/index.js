import React from 'react';

import { Container } from './styles';

export default function Button({
  title,
  onClick,
  type,
  color = '#3F51B5',
  width,
  marginTop,
}) {
  return (
    <Container
      type={type}
      onClick={onClick}
      color={color}
      width={width}
      marginTop={marginTop}
    >
      {title}
    </Container>
  );
}
