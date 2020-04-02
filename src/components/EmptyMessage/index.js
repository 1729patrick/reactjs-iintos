import React from 'react';
import { Container } from './style';
import NoData from '../../assets/images/noData.png';

export default function EmptyMessage() {
  return (
    <Container>
      <img src={NoData} alt="" style={{ width: 100, marginBottom: 15 }} />
      <div>No data available!</div>
    </Container>
  );
}
