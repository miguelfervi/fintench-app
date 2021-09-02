import { types } from "../types/types";

export const loadBalance = () => ({
  type: types.loadBalance,
});

export const updateBalance = (value) => {
  return (dispatch) => {
    dispatch(addTransaction(value, Date.now()));

    dispatch({
      type: types.updateBalance,
      payload: value,
    });
  };
};

export const addTransaction = (value, id) => ({
  type: types.addTransaction,
  payload: {id,  text:`You have entered into the wallet $${value}`},
});
