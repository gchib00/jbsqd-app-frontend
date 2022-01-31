import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateCountries } from "../store/actions";
import { CountryName } from "../types";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SearchField = styled.input`
  height: 38px;
  padding-left: 8px;
  border: 1px solid grey;
  border-radius: 4px;
  outline: none;
`;
const SubmitButton = styled.button`
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

export const CountrySearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); //to indicate that the data is loading (by changing the text of the button)
  const dispatch = useDispatch();
  
  const fetchCountries = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //to avoid refreshing the page
    try {
      setLoading(true);
      const response = await fetch(`/countries?search=${search}`);
      const countriesData = await response.json() as CountryName[];
      dispatch(updateCountries(countriesData));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <Form onSubmit={(e) => fetchCountries(e)}>
    <SearchField 
      type="text" 
      placeholder="Search country..." 
      value={search}
      onChange={(e) => setSearch(e.target.value)} 
    />
    <SubmitButton type="submit">
      {loading ? "..." : "Render Countries"}
    </SubmitButton>
  </Form>
  );
};
