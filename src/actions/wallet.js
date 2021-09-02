import { types } from "../types/types";

export const loadBalance = (value) => ({
  type: types.loadBalance,
  payload: value,
});

export const updateBalance = (value) => ({
    type: types.updateBalance,
    payload: value,
  });
  