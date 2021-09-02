import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

import classes from "./AuthForm.module.css";
import { startLoginEmailPassword } from "../../actions/auth";
import {setError, removeError } from '../../actions/ui'


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const isFormValid = () => {
    if (!validator.isEmail(emailInputRef.current.value)) {
     dispatch(setError('Email is not valid'))
      return false;
    } else if (passwordInputRef.current.value.length < 6) {
      dispatch(setError('Password should be at least 6 characters'))
      return false;
    }
    dispatch(removeError())
    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail, enteredPassword);
    if (isLogin) {
      dispatch(startLoginEmailPassword(enteredEmail, enteredPassword));
    } else {
      if (isFormValid()) {
        console.log("form correct");
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <div className={classes.error}>
      Esto es un error
      </div>
      <form onSubmit={submitHandler}>
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
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <p>Sending request.....</p>
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
