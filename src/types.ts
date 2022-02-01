import { Action } from "redux";

export interface State {
  countries?: CountryName[];
  user?: User;
}
export interface CountryName {
  common: string;
  official: string;
  nativeName?: unknown;
}
export interface ActionWithPayload extends Action {
  payload?: CountryName[];
}
export interface User {
  username: string;
  email: string;
  password: string;
}
export interface Credentials {
  username: string;
  password: string;
}