import styled from 'styled-components';

export const Container = styled.button`
  height: 44px;
  border-radius: 4px;
  border: none;
  background: ${props => props.color};
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  padding: 0 16px;
  width: ${props => props.width};
  margin-top: ${props => props.marginTop};
`;
