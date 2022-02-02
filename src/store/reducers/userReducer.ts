import { ActionWithPayload, User } from "../../types";

const userReducer = (state: User|null = null, action: ActionWithPayload) => {
  switch(action.type) {
    case "LOGIN": 
      return action.payload;
    case "UPDATE_BALANCE": {
      const balanceChange = action.outcome as number;
      const updatedState = {...state} as User;
      updatedState.coins = updatedState.coins+balanceChange;
      return updatedState;
    }
    default: 
      return state;
  }
};
export default userReducer;