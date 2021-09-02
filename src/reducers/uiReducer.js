import { types } from "../types/types";

const INITIAL_STATE = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    default:
      return state;
  }
};
