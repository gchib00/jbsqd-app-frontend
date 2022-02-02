import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  background-color: #1652F0;
  border: 1px solid #1652F0;
  height: 38px;
  font-size: 1.1rem;
  border-radius: 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  margin: 8px 0px 20px 0px;
}
&:hover {
  background-color: #0A46E4;
  border-color: #0A46E4;
}
`;
interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayButton = ({active, setActive}: Props) => {
  const [cooldown, setCooldown] = useState<boolean>(false);

  const handleButtonClick = () => {
    setActive(!active);
    if (active) {
      setCooldown(true); //disable "play" button and give DB enough time to process the data (avoid user spamming the button)
      setTimeout(() => {
        setCooldown(false); //re-enable the "play" button
      }, 1000);
    }
  };

  if (cooldown) {
    return(
      <Button>...</Button>
    );
  }
  return(
    <Button onClick={handleButtonClick}>
      {!active ? "Let's go!" : "Reset"}
    </Button>
  );
};
