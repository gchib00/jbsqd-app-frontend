import { ActionWithPayload } from "../../types";

const countriesReducer = (state = "", action: ActionWithPayload) => {
  switch(action.type) {
    case "UPDATE": 
      return action.payload;
    default: 
      return state;
  }
};

export default countriesReducer;