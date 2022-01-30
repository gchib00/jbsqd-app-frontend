import { Action } from "redux";

export interface State {
  countries: CountryName[];
}
export interface CountryName {
  common: string;
  official: string;
  nativeName?: unknown;
}
export interface ActionWithPayload extends Action {
  payload?: CountryName[];
}