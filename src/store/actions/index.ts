import { CountryName, User } from "../../types";

export const updateCountries = (countriesArr: CountryName[]) => {
  return {
    type: "UPDATE",
    payload: countriesArr
  };
};

export const loginUser = (userObj: User|undefined) => {
  return {
    type: "LOGIN",
    payload: userObj
  };
};