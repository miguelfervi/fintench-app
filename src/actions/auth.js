import { firebase } from "../firebase/firebase-config";
import { types } from "../types/types";
import {startLoading, finishLoading} from "../actions/ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {


    dispatch(startLoading())

    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      dispatch(login(user.uid, user.displayName));
      dispatch(finishLoading());

    })
    .catch((e) => {
      console.log(e);
      dispatch(finishLoading());

    });

  };
};

export const startRegisterEmailPassword = (email, password, displayName) => {
  return (dispatch) => {
    dispatch(startLoading())

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName });

        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());

      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());

      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
