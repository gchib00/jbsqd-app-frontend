import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../types";
import { MiniDashboard } from "./MiniDashboard";
import { PlayButton } from "./PlayButton";
import { SlotMachine } from "./SlotMachine";

const MainContainer = styled.main`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0px auto;
`;

export const SlotMachinePage = () => {
  const [active, setActive] = useState<boolean>(false);
  const user = useSelector((state: State) => state.user);

  const saveNewBalance = async () => { //whenever state gets updated (balance changes), send a request to the backend to save the user's new balance in DB
    if(!user){return null;}
    const request = await fetch("/user/updateBalance", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ //updated user object needs to replace the old one that is present in DB
        username: user.username,
        coins: user.coins 
      }) 
    });
    // console.log(await request.json());
    if (!request.ok) { 
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    saveNewBalance();
  }, [user]);

  if(!user) { //don't let the user play if they are not logged in
    return(
      <MainContainer>
        <h2>Please login in order to play</h2>
      </MainContainer>
    );
  } else if (user.coins <= 0) { //don"t let the user play if they run out of coins
    return(
      <MainContainer>
        <h2>Unfortunately you have run out coins and are no longer allowed to play</h2>
      </MainContainer>
    );
  }
  return(
    <MainContainer>
      <MiniDashboard />
      <SlotMachine active={active} />
      <PlayButton active={active} setActive={setActive} />
    </MainContainer>
  );
};