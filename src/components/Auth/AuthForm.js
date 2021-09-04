import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import classes from "./AuthForm.module.css";
import {
  startLoginEmailPassword,
  startRegisterEmailPassword,
} from "../../actions/auth";
import { setError, removeError } from "../../actions/ui";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const { msgError, loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const buttonMessage = isLogin ? "Login" : "Create Account";

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const isFormValid = () => {
    if (nameInputRef.current.value.length < 4) {
      dispatch(setError("Name should be at least 4 characters"));
      return false;
    } else if (!validator.isEmail(emailInputRef.current.value)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (passwordInputRef.current.value.length < 6) {
      dispatch(setError("Password should be at least 6 characters"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = !isLogin ? nameInputRef.current.value : "";

    if (isLogin) {
      dispatch(startLoginEmailPassword(enteredEmail, enteredPassword));
    } else {
      if (isFormValid()) {
        dispatch(
          startRegisterEmailPassword(enteredEmail, enteredPassword, enteredName)
        );
      }
    }
  };

  return (
    <section data-testid="form" className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {msgError && <div className={classes.error}>{msgError}</div>}
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {loading ? (
            <button disabled={loading}>Loading...</button>
          ) : (
            <button data-testid='button'>{buttonMessage}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
