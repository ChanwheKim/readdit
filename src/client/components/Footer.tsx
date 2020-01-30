import * as React from "react";
import styled from "@emotion/styled";

const Self = styled.div`
  background-color: #f9fafa;
  width: 100%;
  height: 17rem;
  display: flex;
  justify-content: center;
  align-items: center;
  label: Footer;

  & p {
    font-size: 1.4rem;
    font-weight: 300;
    transform: translateY(-1rem);
  }
`;

const Footer: React.FunctionComponent = () => (
  <Self>
    <p>© 2019 Readdit - All Rights Reserved</p>
  </Self>
);

export default Footer;
