import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateBalance } from "../store/actions";

const ReelContainer = styled.div`
  width: 99%;
  height: 60px;
  border: 2px solid black;
  display: flex;
`;
const Reel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.4%;
`;
const PlaceholderDiv = styled.div`
  background-color: #cacaca;
  width: 100%;
  height: 100%;
`;
interface Props {
  active: boolean;
}
interface ReelValue {
  value: string;
  color: string;
}

export const SlotMachine = ({active}: Props) => {
  const [values, setValues] = useState<ReelValue[]|undefined>(undefined);
  const dispatch = useDispatch();
    
  const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
  const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
  const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

  const play = async () => {
    //get random values from each array:
    const value1 = reel1[Math.floor(Math.random()*reel1.length)];
    const value2 = reel2[Math.floor(Math.random()*reel2.length)];
    const value3 = reel3[Math.floor(Math.random()*reel3.length)];
    //set values to state
    setValues([
      {value: value1, color: getColor(value1)},
      {value: value2, color: getColor(value2)},
      {value: value3, color: getColor(value3)}
    ]);
  };

  const determineOutcome = (): number => {
    if(!values){return 0;}
    let triple = false;
    let double = false;
    let winningString = "";
    switch(true){
      case(values[0].value === values[1].value 
        && values[0].value === values[2].value): {
          triple = true; //confirm triple combination
          winningString = values[0].value; //save winner string
          break;
        }
      case(values[0].value === values[1].value
        || values[0].value === values[2].value): {
          double = true; //confirm double combination
          winningString = values[0].value; //save winner string
          break;
        }
      case(values[1].value === values[2].value): {
        double = true; //confirm double combination
        winningString = values[1].value; //save winner string
        break;
      }
      default: 0;
    }
    if (triple) {  //determine the amount of coins based on winning string instance
      switch(winningString){
        case("cherry"): return 50; 
        case("apple"): return 20;
        case("banana"): return 15;
        case("lemon"): return 3;
      }
    } else if (double) { //determine the amount of coins based on winning string instance
      switch(winningString){
        case("cherry"): return 40; 
        case("apple"): return 10;
        case("banana"): return 5;
      }
    }
    return 0; //if all else fails, return 0
  };

  const getColor = (value: string) => {
    switch(value){ //return a particular color depending on the value received from the reel
      case("lemon"): return "#f2f547";
      case("cherry"): return "#ab1616";
      case("apple"): return "#9fed5a";
      case("banana"): return "#f7d111";
      default: return "grey";
    }
  };

  useEffect(() => {
    if (active) {
      play(); //run the fn to display random values from each reel
    } else {
      setValues(undefined); //reset the state
    }
  }, [active]);

  useEffect(() => { //once results set in, determine the outcome
    if (values){ //don't charge customer if they are simply resetting the reels
      const outcome = determineOutcome()-1;
      dispatch(updateBalance(outcome));
    }
  }, [values]);

  return(
    <ReelContainer>
      {values ? values.map((item, index) => {
        return(
          <Reel key={index} style={{backgroundColor: item.color}}>
            {item.value}
          </Reel>
        );
      }) 
      : //return a placeholder div if slot is inactive
      <PlaceholderDiv />}
    </ReelContainer>
  );
};