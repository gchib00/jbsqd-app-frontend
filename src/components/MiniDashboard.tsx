import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../types";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MiniDashboard = () => {
  const user = useSelector((state: State) => state.user);

  if (!user) {
    return null;
  }
  return(
    <Container>
      <p>My Balance: {user.coins}</p>
    </Container>
  );
};
