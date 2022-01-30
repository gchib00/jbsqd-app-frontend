import { CountryName } from "../../types";

export const updateCountries = (countriesArr: CountryName[]) => {
  return {
    type: "UPDATE",
    payload: countriesArr
  };
};