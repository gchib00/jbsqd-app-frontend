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
  outcome?: number;
}
export interface User {
  username: string;
  email: string;
  coins: number;
  password: string;
}
export interface Credentials {
  username: string;
  password: string;
}