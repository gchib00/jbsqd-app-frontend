import { ActionWithPayload } from "../../types";

const userReducer = (state = null, action: ActionWithPayload) => {
  switch(action.type) {
    case "LOGIN": 
      return action.payload;
    default: 
      return state;
  }
};
export default userReducer;