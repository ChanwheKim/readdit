import * as React from "react";
import styled from "@emotion/styled";
import { FaSpinner } from "react-icons/fa";

const Self = styled.div`
  margin-top: 10rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label: Loading;
`;

const Background = styled.div`
    background-color: transparent;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

const Spinner = styled(FaSpinner)`
    color: rgba(#28b485, .8);
    animation: rotate 1.5s infinite linear;
    position: absolute;
    top: 40%;
    left: 48%;
    transform: translate(-50%, -50%);
`;

export default function Loading() {
  return (
    <Self>
      <Background>
        <Spinner />
      </Background>
    </Self>
  );
}
