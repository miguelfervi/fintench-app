import { types } from "../types/types";
import uniqid from 'uniqid';


export const loadBalance = () => ({
  type: types.loadBalance,
});

export const updateBalance = (value) => {
  return (dispatch) => {
    dispatch(addTransaction(value, uniqid()));

    dispatch({
      type: types.updateBalance,
      payload: value,
    });
  };
};

export const addTransaction = (value, id) => {
  let text = ''
  if (value < 0 ){
    text = `You have retired into the wallet $${value}`
  } else {
    text = `You have deposited from the wallet $${value}`
  }
  return ({
    type: types.addTransaction,
    payload: { id, text},
  });
};
