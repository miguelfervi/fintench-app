import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, Switch, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";

import { firebase } from "../../firebase/firebase-config";

import WalletPage from "../Wallet/Wallet";
import AuthPage from "../../pages/AuthPage";
import HomePage from "../../pages/HomePage";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { PublicRoute } from "../../routers/PublicRoute";

import { login, startLogout } from "../../actions/auth";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <h1>Espere.....</h1>;
  }

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <BrowserRouter>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>Fintech App</div>
        </Link>
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/auth">Log In</Link>
              </li>
            )}
            {isLoggedIn && (
              <React.Fragment>
                <li>
                  <Link to="/wallet">Wallet</Link>
                </li>
                <li>
                  <Link to="/send">Send Balance</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
      <Switch>
        <PublicRoute
          path="/"
          isAuthenticated={isLoggedIn}
          exact
          component={HomePage}
        />
        <PublicRoute
          path="/auth"
          isAuthenticated={isLoggedIn}
          component={AuthPage}
        />
        <PrivateRoute
          path="/wallet"
          isAuthenticated={isLoggedIn}
          component={WalletPage}
        />
        <PrivateRoute
          path="/send"
          isAuthenticated={isLoggedIn}
          component={HomePage}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default MainNavigation;
