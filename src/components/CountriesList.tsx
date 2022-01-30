import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../types";

const Listing = styled.ul`
  padding: 0;
  list-style-type: none;
  text-align: center;
`;

export const CountriesList = () => {
  const countriesArr = useSelector((state: State) => state.countries);

  if (!countriesArr || countriesArr.length === 0) {
    return null;
  }
  return (
    <Listing>
      {countriesArr.map(country => {
        return(
          <li key={country.official}>
            {country.official}
          </li>
        );
      })}
    </Listing>
  );
};