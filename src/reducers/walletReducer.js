import { types } from "../types/types";

const INITIAL_STATE = {
  balance: 1500,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.loadBalance:
      return {
        balance: state.balance,
      };

    case types.updateBalance:
      return {
        balance: state.balance + action.payload,
      };

    default:
      return state;
  }
};
