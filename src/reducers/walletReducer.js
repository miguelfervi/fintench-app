import { types } from "../types/types";

const INITIAL_STATE = {
  balance: 0,
  history: [],
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.loadBalance:
      return {
        ...state,
        balance: state.balance,
      };

    case types.updateBalance:
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case types.retireBalance:
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case types.addTransaction:
      const newTransaction = action.payload;
      return {
        ...state,
        history: [...state.history, newTransaction],
      };

    default:
      return state;
  }
};
