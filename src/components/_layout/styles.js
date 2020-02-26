import styled from 'styled-components';

export const Wrapper = styled.div`
  > div {
    padding-top: 80px;
    > div {
      height: ${props =>
        props.noFooter ? 'calc(100vh - 80px)' : 'calc(100vh - 120px)'};
      overflow-y: auto;
    }
  }
`;
