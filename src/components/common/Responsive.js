import React from 'react';
import styled from 'styled-components';

function Responsive({ children, ...rest }) {
  // style, className, onClick 등의 props를 사용하도록
  // ...rest로 전달
  return <ResponsiveBlcok {...rest}>{children}</ResponsiveBlcok>;
}

export default Responsive;

const ResponsiveBlcok = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
