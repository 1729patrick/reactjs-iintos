import React from 'react';
import { Container } from './styles';
import NoData from '../../assets/images/noData.png';

export default function EmptyMessage({ message, Action }) {
  return (
    <Container>
      <img src={NoData} alt="" style={{ width: 100, marginBottom: 15 }} />
      <div>{message || 'No data available!'}</div>
      {Action && <Action />}
    </Container>
  );
}
