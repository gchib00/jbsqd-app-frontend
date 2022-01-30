import React from "react";
import { CountriesList } from "./CountriesList";
import { CountrySearchBar } from "./CountrySearchBar";
import styled from "styled-components";

const MainContainer = styled.main`
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 0px auto;
`;

export const CountriesListPage = () => {
  return(
    <MainContainer>
      <CountrySearchBar />
      <CountriesList />
    </MainContainer>
  );
};
