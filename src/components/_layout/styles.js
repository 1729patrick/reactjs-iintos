import styled from 'styled-components';

export const Wrapper = styled.div`
  > div {
    padding-top: ${props => (props.noFooter ? '0' : '80px')};
    > div {
      height: ${props => (props.noFooter ? '100vh' : 'calc(100vh - 120px)')};
      overflow-y: auto;
    }
  }
`;
