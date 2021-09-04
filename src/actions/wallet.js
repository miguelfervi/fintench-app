import { types } from "../types/types";

export const loadBalance = () => ({
  type: types.loadBalance,
});

export const updateBalance = (value) => {
  return (dispatch) => {
    dispatch({
      type: types.updateBalance,
      payload: value,
    });
  };
};

export const retireBalance = (value) => {
  return (dispatch) => {
    dispatch({
      type: types.retireBalance,
      payload: value,
    });
  };
};

export const addTransaction = (value, name, id) => {
  let text = "";
  if (value < 0 && name === '') {
    text = `You have retired from the wallet $${ -1* value}`;
  } else if (value > 0 && name === "") {
    text = `You have entered from the wallet $${value}`;
  } else {
    text = `You send credit $${value} to ${name} `;
  }

  return {
    type: types.addTransaction,
    payload: { id, text },
  };
};
