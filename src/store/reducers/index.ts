import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  countries: countriesReducer,
  user: userReducer
});

export default allReducers;