import styled from 'styled-components';

export const Wrapper = styled.div`
  > div {
    padding-top: 80px;
    > div {
      height: calc(100vh - 120px);
      overflow: hidden;
      overflow-y: auto;
    }
  }
`;
