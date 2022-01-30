import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";

const allReducers = combineReducers({
  countries: countriesReducer
});

export default allReducers;